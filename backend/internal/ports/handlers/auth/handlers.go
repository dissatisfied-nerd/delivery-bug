package handlers

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"time"
)

var secretKey = os.Getenv("SECRET_KEY")

type IHandler interface {
	SignUpUser(ctx *gin.Context)
	SignInUser(ctx *gin.Context)
	Logout(ctx *gin.Context)
}

type Handler struct {
	service user.UsersService
	l       *logging.Logger
}

func NewHandler(service user.UsersService, l logging.Logger) *Handler {
	return &Handler{service: service, l: &l}
}

func (h *Handler) SignUpUser(ctx *gin.Context) {
	var payload auth.SignUpInput
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		h.l.Errorf("ERROR can't bind json: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := auth.ValidateSignUpInput(payload)
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

	tokenString, err := auth.GenerateJWT(secretKey, userID)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{})
}

func (h *Handler) SignInUser(ctx *gin.Context) {
	var payload auth.SignInInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		h.l.Errorf("ERROR can't bind json: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := auth.ValidateSignInInput(payload); err != nil {
		h.l.Error(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, err := h.service.CheckUser(ctx, payload)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tokenString, err := auth.GenerateJWT(secretKey, userID)
	if err != nil {
		h.l.Errorf("ERROR while generating jwt: %v", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("jwt", tokenString, int(time.Now().Add(time.Hour*24*3).Unix()), "/",
		os.Getenv("HOST"), true, true)

	ctx.JSON(http.StatusOK, gin.H{})
}

func (h *Handler) Logout(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", 0, "/", os.Getenv("HOST"), true, true)
}
