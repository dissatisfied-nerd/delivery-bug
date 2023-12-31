package product

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductsRepository interface {
	SelectProducts(ctx context.Context) ([]dtos.ProductDTOOutput, error)
	SelectProductByID(ctx context.Context, productID string) (dtos.ProductDTOOutput, error)
	InsertProductByStore(ctx context.Context, product dtos.ProductDTO, storeID string) (string, error)
	SelectProductsByStore(ctx context.Context, storeID string) ([]models.Product, error)
	DeleteProductById(ctx context.Context, productID string) error
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) SelectProducts(ctx context.Context) ([]dtos.ProductDTOOutput, error) {
	var products []dtos.ProductDTOOutput
	rows, err := r.db.Query(ctx, selectProductsQuery)
	if err != nil {
		r.l.Errorf("error getting products from db: %v", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var product dtos.ProductDTOOutput
		var storeId string
		err = rows.Scan(&product.ID, &product.Name, &product.Price, &product.Weight, &product.Description,
			&product.Image, &product.Quantity, &storeId)
		if err != nil {
			r.l.Error(err)
			return nil, err
		}

		err := r.db.QueryRow(ctx, selectStoreNameById, storeId).Scan(&product.StoreName)
		if err != nil {
			r.l.Error(err)
			return nil, err
		}

		products = append(products, product)
	}

	return products, nil
}

func (r *Repository) SelectProductByID(ctx context.Context, productID string) (dtos.ProductDTOOutput, error) {
	var product dtos.ProductDTOOutput
	var storeId string
	err := r.db.QueryRow(ctx, selectProductByID, productID).Scan(
		&product.ID,
		&product.Name,
		&product.Price,
		&product.Weight,
		&product.Description,
		&product.Image,
		&product.Quantity,
		&storeId,
	)
	if err != nil {
		r.l.Error(err)
		return dtos.ProductDTOOutput{}, err
	}

	err = r.db.QueryRow(ctx, selectStoreNameById, storeId).Scan(&product.StoreName)
	if err != nil {
		r.l.Error(err)
		return dtos.ProductDTOOutput{}, err
	}

	return product, nil
}

func (r *Repository) InsertProductByStore(ctx context.Context, product dtos.ProductDTO, storeID string) (string, error) {
	var productID string
	err := r.db.QueryRow(ctx, insertProductQuery, product.Name, product.Price, product.Weight, product.Description,
		product.Image, product.Quantity, storeID).Scan(&productID)
	if err != nil {
		r.l.Errorf("error inserting product %s: %v", product.Name, err)
		return "", err
	}
	return productID, nil
}

func (r *Repository) SelectProductsByStore(ctx context.Context, storeID string) ([]models.Product, error) {
	var products []models.Product
	rows, err := r.db.Query(ctx, selectProductsByStore, storeID)
	if err != nil {
		r.l.Errorf("error getting products from db: %v", err)
		return nil, err
	}
	for rows.Next() {
		var product models.Product
		err = rows.Scan(&product.ID, &product.Name, &product.Price, &product.Weight, &product.Description,
			&product.Image, &product.Quantity)
		if err != nil {
			r.l.Errorf("error getting products from db: %v", err)
			return nil, err
		}
		product.StoreId = storeID
		products = append(products, product)
	}

	r.l.Info("getting products from db")
	return products, nil
}

func (r *Repository) DeleteProductById(ctx context.Context, productID string) error {
	//Template
	rowsOrderID, err := r.db.Query(ctx, selectOrderByProduct, productID)
	if err != nil {
		r.l.Errorf("Error while getting order id %v", err)
		return err
	}

	result, err := r.db.Exec(ctx, deleteProductById, productID)
	if err != nil {
		r.l.Errorf("error while deleting product %s: %v", productID, err)
		return err
	}

	rowsAffected := result.RowsAffected()
	if rowsAffected == 0 {
		r.l.Errorf("no products with id %s", productID)
		return errors.New("no products with such id")
	}

	for rowsOrderID.Next() {
		var orderID string
		rowsOrderID.Scan(&orderID)
		_, err := r.db.Exec(ctx, deleteOrderById, orderID)
		if err != nil {
			r.l.Errorf("Error while deleting order %v", err)
		}
	}
	//Template

	r.l.Infof("deleting product with id %s", productID)
	return nil
}
