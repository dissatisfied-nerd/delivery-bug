package order

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"github.com/jackc/pgx/v5/pgxpool"
	"time"
)

type Repository interface {
	CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (string, error)
	GetOrders(ctx context.Context) ([]*dtos.OrderDTOOutput, error)
}

type repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l *logging.Logger) Repository {
	return &repository{db: db, l: l}
}

func (r *repository) CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (string, error) {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		r.l.Errorf("ERROR while start tx: %v", err)
		return "", err
	}

	var orderID string
	if err := tx.QueryRow(ctx, createOrder, order.Price, time.Now(), order.ClientID).Scan(&orderID); err != nil {
		r.l.Errorf("ERROR while inserting order %f %v %s in db: %v",
			order.Price,
			time.Now(),
			order.ClientID,
			err,
		)

		if err := tx.Rollback(ctx); err != nil {
			r.l.Errorf("ERROR while rollback tx: %v", err)
			return "", err
		}

		return "", err
	}

	for _, product := range order.Products {
		if _, err := tx.Query(ctx, createOrderProducts, product.Amount, orderID, product.ProductID); err != nil {
			r.l.Errorf("ERROR while inserting order_products %d %s %s",
				product.Amount,
				orderID,
				product.ProductID,
			)

			if err := tx.Rollback(ctx); err != nil {
				r.l.Errorf("ERROR while rollback tx: %v", err)
				return "", err
			}

			return "", err
		}
	}

	if err := tx.Commit(ctx); err != nil {
		r.l.Errorf("ERROR while rollback tx: %v", err)
		return "", err
	}

	return orderID, nil
}

func (r *repository) GetOrders(ctx context.Context) ([]*dtos.OrderDTOOutput, error) {
	rowsOrders, err := r.db.Query(ctx, getOrders)
	if err != nil {
		r.l.Errorf("ERROR while get orders %s: %v", getOrders, err)
	}

	defer rowsOrders.Close()

	ordersDto := make([]*dtos.OrderDTOOutput, 0)

	for rowsOrders.Next() {
		var order models.Orders
		err := rowsOrders.Scan(&order)
		if err != nil {
			r.l.Errorf("ERROR while get order: %v", err)
			return nil, err
		}

		rowsOrdersProduct, err := r.db.Query(ctx, getOrderProducts, order.ID)
		if err != nil {
			r.l.Errorf("ERROR while get order products %s: %v", getOrders, err)
		}

		var ordersProducts []models.OrderProducts

		for rowsOrdersProduct.Next() {
			var orderProduct models.OrderProducts
			err := rowsOrdersProduct.Scan(&orderProduct)
			if err != nil {
				r.l.Errorf("ERROR while get orderProduct: %v", err)
			}

			ordersProducts = append(ordersProducts, orderProduct)
		}

		rowsOrdersProduct.Close()

		ordersDto = append(ordersDto, dtos.ToOrderDTOOutput(order, ordersProducts))

	}

	return ordersDto, nil
}
