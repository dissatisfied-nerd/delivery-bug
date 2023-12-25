package products

import (
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/repo/product"
	"delivery-bug/pkg/logging"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProductHandler interface {
	GetProducts(ctx *gin.Context)
	GetProductByID(ctx *gin.Context)
	CreateProduct(ctx *gin.Context)
	GetProductsByStore(ctx *gin.Context)
	DeleteProductById(ctx *gin.Context)
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
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	h.l.Info(products)
	ctx.JSON(http.StatusOK, gin.H{"products": products})
}

func (h *Handler) GetProductByID(ctx *gin.Context) {
	productID := ctx.Param("productID")
	h.l.Info(productID)

	info, err := h.repo.SelectProductByID(ctx, productID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.l.Info(info)
	ctx.JSON(http.StatusOK, gin.H{"product": info})
}

func (h *Handler) CreateProduct(ctx *gin.Context) {
	storeID := ctx.Param("storeID")
	h.l.Debugf("store:%s", storeID)
	var input dtos.ProductDTOInput

	if err := ctx.ShouldBindJSON(&input); err != nil {
		h.l.Error(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payload, err := dtos.ToProductDTO(input)
	if err != nil {
		h.l.Error(err)
	}

	res, err := h.repo.InsertProductByStore(ctx, payload, storeID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"product_id": res})
}

func (h *Handler) GetProductsByStore(ctx *gin.Context) {
	storeID := ctx.Param("storeID")
	res, err := h.repo.SelectProductsByStore(ctx, storeID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"products": res})
}

func (h *Handler) DeleteProductById(ctx *gin.Context) {
	productID := ctx.Param("id")
	err := h.repo.DeleteProductById(ctx, productID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"product_id": productID})
}
