package orders

import (
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/repo/order"
	"delivery-bug/pkg/logging"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"net/http"
)

type OrderHandler interface {
	CreateOrder(ctx *gin.Context)
	GetFreeOrders(ctx *gin.Context)
}

type Handler struct {
	repo      order.OrdersRepository
	validator *validator.Validate
	l         *logging.Logger
}

func NewHandler(repo order.OrdersRepository, validator *validator.Validate, l logging.Logger) *Handler {
	return &Handler{
		repo:      repo,
		validator: validator,
		l:         &l,
	}
}

func (h *Handler) CreateOrder(ctx *gin.Context) {
	var input dtos.OrderDTOInput
	err := ctx.ShouldBindJSON(&input)
	if err != nil {
		h.l.Error(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	res, err := h.repo.CreateOrder(ctx, &input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"order": res})
}

func (h *Handler) GetFreeOrders(ctx *gin.Context) {
	orders, err := h.repo.GetFreeOrders(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"orders": orders})
}

//func (h *Handler) TakeOrder(ctx *gin.Context) {
//
//}
