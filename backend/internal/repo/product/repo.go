package product

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"

	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductsRepository interface {
	SelectProducts(ctx context.Context) ([]models.Product, error)
	SelectProductByID(ctx context.Context, productID string) (models.Product, error)
	InsertProduct(ctx context.Context, input *dtos.ProductDTOInput) (string, error)
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

func (r *Repository) InsertProduct(ctx context.Context, input *dtos.ProductDTOInput) (string, error) {
	var insertedProductId string
	err := r.db.QueryRow(ctx, createProductQuery,
		input.Name,
		input.Price,
		input.Weight,
		input.Description,
		input.Image,
		input.StoreId,
	).Scan(&insertedProductId)
	if err != nil {
		r.l.Errorf("ERROR while inserting product %s in db: %v", input.Name, err)
		return "", err
	}
	r.l.Infof("insert product %s in db", input.Name)
	return insertedProductId, nil
}
