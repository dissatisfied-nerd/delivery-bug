package store

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/service/store"
	"delivery-bug/pkg/logging"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"net/http"
	"os"
	"time"
)

const role = "store"

type StoresHandler interface {
	SignUpStore(ctx *gin.Context)
	SignInStore(ctx *gin.Context)
}

type Handler struct {
	service   store.StoresService
	auth      auth.Auth
	validator *validator.Validate
	l         *logging.Logger
}

func NewHandler(service store.StoresService, l logging.Logger,
	validator *validator.Validate, auth auth.Auth) *Handler {
	return &Handler{service: service, l: &l, validator: validator, auth: auth}
}

func (h *Handler) SignUpStore(ctx *gin.Context) {
	var payload auth.SignUpStoreInput
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		h.l.Errorf("ERROR can't bind json: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.l.Debug(payload)
	err := h.validator.Struct(&payload)
	if err != nil {
		h.l.Error(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ID, err := h.service.CreateStore(ctx, payload)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(ID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"store_id": ID})
}

func (h *Handler) SignInStore(ctx *gin.Context) {
	var payload auth.SignInInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		h.l.Errorf("ERROR can't bind json: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.validator.Struct(&payload); err != nil {
		h.l.Error(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ID, err := h.service.CheckStore(ctx, payload)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(ID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"store_id": ID})
}
