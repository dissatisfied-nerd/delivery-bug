package orders

import (
	"delivery-bug/internal/repo/order"
	"delivery-bug/pkg/logging"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type OrderHandler interface {
	CreateOrder(ctx *gin.Context)
	GetOrders(ctx *gin.Context)
	GetOrdersByUserID(ctx *gin.Context)
}

type Handler struct {
	repo      order.OrdersRepository
	validator *validator.Validate
	l         *logging.Logger
}
