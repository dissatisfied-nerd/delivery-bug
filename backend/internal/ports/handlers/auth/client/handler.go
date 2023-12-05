package client

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

const role = "client"

type ClientsAuthHandler interface {
	SignUpClient(ctx *gin.Context)
	SignInClient(ctx *gin.Context)
	Logout(ctx *gin.Context)
}

type Handler struct {
	service   user.UsersService
	auth      auth.Auth
	validator *validator.Validate
	l         *logging.Logger
}

func NewHandler(service user.UsersService, l logging.Logger,
	validator *validator.Validate, auth auth.Auth) *Handler {
	return &Handler{service: service, l: &l, validator: validator, auth: auth}
}

func (h *Handler) SignUpClient(ctx *gin.Context) {
	var payload auth.ClientSignUpInput
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		h.l.Errorf("ERROR can't bind json: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.validator.Struct(&payload)
	if err != nil {
		h.l.Error(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, err := h.service.CreateUser(ctx, payload)
	if err != nil && err != errors.New("no rows in result set") {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(userID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"client_id": userID})
}

func (h *Handler) SignInClient(ctx *gin.Context) {
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

	userID, err := h.service.CheckUser(ctx, payload)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(userID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"client_id": userID})
}

func (h *Handler) Logout(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", 0, "/", h.auth.GetHost(), true, true)

	ctx.Status(http.StatusOK)
}