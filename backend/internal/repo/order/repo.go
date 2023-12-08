package order

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"github.com/jackc/pgx/v5/pgxpool"
	"time"
)

const statusCreated = "created"

type OrdersRepository interface {
	CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (string, error)
	GetOrdersByUserID(ctx context.Context, userID string) ([]*dtos.OrderUserDTOOutput, error)
	GetOrdersByCourierID(ctx context.Context, courierID string) ([]*dtos.OrderCourierDTOOutput, error)
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (string, error) {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		r.l.Errorf("ERROR while start tx: %v", err)
		return "", err
	}

	var orderID string
	if err := tx.QueryRow(ctx, createOrder, order.Price, time.Now(), order.ClientID, statusCreated).Scan(&orderID); err != nil {
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

func (r *Repository) GetOrdersByUserID(ctx context.Context, userID string) ([]*dtos.OrderUserDTOOutput, error) {
	rowsOrders, err := r.db.Query(ctx, getOrdersByUserID, userID)
	if err != nil {
		r.l.Errorf("ERROR while get orders %s: %v", getOrdersByUserID, err)
	}

	defer rowsOrders.Close()

	ordersDto := make([]*dtos.OrderUserDTOOutput, 0)

	for rowsOrders.Next() {
		var order models.Orders
		err := rowsOrders.Scan(&order)
		if err != nil {
			r.l.Errorf("ERROR while get order: %v", err)
			return nil, err
		}

		rowsOrdersProduct, err := r.db.Query(ctx, getOrderProducts, order.ID)
		if err != nil {
			r.l.Errorf("ERROR while get order products %s: %v", getOrderProducts, err)
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

		ordersDto = append(ordersDto, dtos.ToOrderUserDTOOutput(order, ordersProducts))

	}

	return ordersDto, nil
}

func (r *Repository) GetOrdersByCourierID(ctx context.Context, courierID string) ([]*dtos.OrderCourierDTOOutput, error) {
	rowsOrders, err := r.db.Query(ctx, getOrdersByCourierSID, courierID)
	if err != nil {
		r.l.Errorf("ERROR while get orders %s: %v", getOrdersByUserID, err)
	}

	defer rowsOrders.Close()

	ordersDto := make([]*dtos.OrderCourierDTOOutput, 0)

	for rowsOrders.Next() {
		var order models.Orders
		err := rowsOrders.Scan(&order)
		if err != nil {
			r.l.Errorf("ERROR while get order: %v", err)
			return nil, err
		}

		rowsOrdersProduct, err := r.db.Query(ctx, getOrderProducts, order.ID)
		if err != nil {
			r.l.Errorf("ERROR while get order products %s: %v", getOrderProducts, err)
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

		ordersDto = append(ordersDto, dtos.ToOrderCourierDTOOutput(order, ordersProducts))

	}

	return ordersDto, nil
}

func (r *Repository) GetFreeOrders(ctx context.Context) ([]dtos.OrderDTO, error) {
	rows, err := r.db.Query(ctx, selectFreeOrdersQuery, statusCreated)
	if err != nil {
		r.l.Errorf("error getting free orders from db: %v", err)
		return nil, err
	}
	defer rows.Close()
	var orders []dtos.OrderDTO

	for rows.Next() {
		var order dtos.OrderDTO
		err = rows.Scan(&order)
		if err != nil {
			r.l.Errorf("error getting free orders from db: %v", err)
			return nil, err
		}
		orders = append(orders, order)
	}
	r.l.Info("get free orders from db")
	return orders, nil
}
