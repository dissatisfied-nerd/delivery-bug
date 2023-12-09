package courier

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/service/courier"
	"delivery-bug/pkg/logging"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"net/http"
	"os"
	"time"
)

const role = "courier"

type CouriersAuthHandler interface {
	SignUpCourier(ctx *gin.Context)
	SignInCourier(ctx *gin.Context)
}

type Handler struct {
	service   courier.CouriersService
	auth      auth.Auth
	validator *validator.Validate
	l         *logging.Logger
}

func NewHandler(service courier.CouriersService, auth auth.Auth,
	validator *validator.Validate, l logging.Logger) *Handler {
	return &Handler{service: service, auth: auth, validator: validator, l: &l}
}

func (h *Handler) SignUpCourier(ctx *gin.Context) {
	var payload auth.SignUpInput
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

	courierID, err := h.service.CreateCourier(ctx, payload)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(courierID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"courier_id": courierID})
}

func (h *Handler) SignInCourier(ctx *gin.Context) {
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

	courierID, err := h.service.CheckCourier(ctx, payload)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := h.auth.GenerateJWT(courierID, role)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{"courier_id": courierID})
}
