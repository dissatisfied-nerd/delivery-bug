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
	SelectProducts(ctx context.Context) ([]models.Product, error)
	SelectProductByID(ctx context.Context, productID string) (models.Product, error)
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

func (r *Repository) SelectProducts(ctx context.Context) ([]models.Product, error) {
	var products []models.Product
	rows, err := r.db.Query(ctx, getProductsQuery)
	if err != nil {
		r.l.Errorf("error getting products from db: %v", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var product models.Product
		err = rows.Scan(&product.ID, &product.Name, &product.Price, &product.Weight, &product.Description, &product.Image)
		if err != nil {
			r.l.Error(err)
			return nil, err
		}
		products = append(products, product)
	}

	return products, nil
}

func (r *Repository) SelectProductByID(ctx context.Context, productID string) (models.Product, error) {
	var product models.Product
	err := r.db.QueryRow(ctx, getProductByID, productID).Scan(&product.ID,
		&product.Name,
		&product.Price,
		&product.Weight,
		&product.Description,
		&product.Image,
	)
	if err != nil {
		r.l.Error(err)
		return models.Product{}, err
	}

	return product, nil
}

func (r *Repository) InsertProductByStore(ctx context.Context, product dtos.ProductDTO, storeID string) (string, error) {
	var productID string
	err := r.db.QueryRow(ctx, insertProductQuery, product.Name, product.Price, product.Weight, product.Description,
		product.Image, storeID).Scan(&productID)
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
			&product.Image)
		if err != nil {
			r.l.Errorf("error getting products from db: %v", err)
			return nil, err
		}
		products = append(products, product)
	}

	r.l.Info("getting products from db")
	return products, nil
}

func (r *Repository) DeleteProductById(ctx context.Context, productID string) error {
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

	return nil
}
