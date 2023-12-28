package clients

import (
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ClientHandler interface {
	GetInfoByID(ctx *gin.Context)
}

type Handler struct {
	service user.UsersService
	l       *logging.Logger
}

func NewHandler(service user.UsersService, l logging.Logger) *Handler {
	return &Handler{
		service: service,
		l:       &l,
	}
}

func (h *Handler) GetInfoByID(ctx *gin.Context) {
	id := ctx.Param("clientID")

	info, err := h.service.GetInfoById(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"client": info})
}
