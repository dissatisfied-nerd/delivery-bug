package administrator

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/service/administrator"
	"delivery-bug/pkg/logging"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

const role = "administrator"

type AdministratorAuthHandler interface {
	SignUpAdministrator(ctx *gin.Context)
	SignInAdministrator(ctx *gin.Context)
	Logout(ctx *gin.Context)
}

type Handler struct {
	service   administrator.AdministratorService
	auth      auth.Auth
	validator *validator.Validate
	l         *logging.Logger
}

func NewHandler(service administrator.AdministratorService, l logging.Logger,
	validator *validator.Validate, auth auth.Auth) *Handler {
	return &Handler{service: service, l: &l, validator: validator, auth: auth}
}

func (h *Handler) SignUpAdministrator(ctx *gin.Context) {
	var payload auth.SignUpAdministrator
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

	adminID, err := h.service.CreateAdministrator(ctx, payload)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(adminID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"client_id": adminID})
}

func (h *Handler) SignInAdministrator(ctx *gin.Context) {
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

	adminID, err := h.service.CheckAdministrator(ctx, payload)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(adminID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"client_id": adminID})
}

func (h *Handler) Logout(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", 0, "/", h.auth.GetHost(), true, true)

	ctx.Status(http.StatusOK)
}
