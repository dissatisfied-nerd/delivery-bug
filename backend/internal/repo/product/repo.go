package product

import (
	"context"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductsRepository interface {
	SelectProducts(ctx context.Context) ([]models.Product, error)
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
