package products

import (
	"delivery-bug/internal/repo/product"
	"delivery-bug/pkg/logging"
	"github.com/gin-gonic/gin"
	"net/http"
)

type ProductHandler interface {
	GetProducts(ctx *gin.Context)
}

type Handler struct {
	repo product.ProductsRepository
	l    *logging.Logger
}

func NewHandler(repo product.ProductsRepository, l logging.Logger) *Handler {
	return &Handler{
		repo: repo,
		l:    &l,
	}
}

func (h *Handler) GetProducts(ctx *gin.Context) {
	products, err := h.repo.SelectProducts(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	h.l.Info(products)
	ctx.JSON(http.StatusOK, gin.H{"products": products})
}
