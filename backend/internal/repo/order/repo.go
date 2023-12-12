package order

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"github.com/jackc/pgx/v5/pgxpool"
	"time"
)

const (
	statusCreated  = "created"
	statusFinished = "finished"
	statusTaken    = "taken"
)

type OrdersRepository interface {
	CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (models.Order, error)
	GetOrdersByUserID(ctx context.Context, userID string) ([]*dtos.OrderUserDTOOutput, error)
	GetOrdersByCourierID(ctx context.Context, courierID string) ([]*dtos.OrderCourierDTOOutput, error)
	GetFreeOrders(ctx context.Context) ([]dtos.OrderDTO, error)
	SetOrderTaken(ctx context.Context, orderID, courierID string) (models.Order, error)
	SetOrderFinished(ctx context.Context, orderID, courierID string) (models.Order, error)
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (models.Order, error) {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		r.l.Errorf("Error starting transaction: %v", err)
		return models.Order{}, err
	}

	var orderID string
	if err = tx.QueryRow(ctx, createOrder, order.Price, time.Now(), order.ClientID, statusCreated).Scan(&orderID); err != nil {
		r.l.Errorf("Error inserting order into the database: %v", err)
		rollbackErr := tx.Rollback(ctx)
		if rollbackErr != nil {
			r.l.Errorf("Error rolling back transaction: %v", rollbackErr)
		}
		return models.Order{}, err
	}

	for _, product := range order.Products {
		if _, err = tx.Exec(ctx, createOrderProducts, product.Amount, orderID, product.ProductID); err != nil {
			r.l.Errorf("Error inserting order_products into the database: %v", err)
			rollbackErr := tx.Rollback(ctx)
			if rollbackErr != nil {
				r.l.Errorf("Error rolling back transaction: %v", rollbackErr)
			}
			return models.Order{}, err
		}
	}

	if err = tx.Commit(ctx); err != nil {
		r.l.Errorf("Error committing transaction: %v", err)
		rollbackErr := tx.Rollback(ctx)
		if rollbackErr != nil {
			r.l.Errorf("Error rolling back transaction: %v", rollbackErr)
		}
		return models.Order{}, err
	}

	now := time.Now()
	res := models.Order{
		ID:           orderID,
		Price:        order.Price,
		Status:       statusCreated,
		CreationTime: &now,
		ClientId:     order.ClientID,
	}

	return res, nil
}

func (r *Repository) GetOrdersByUserID(ctx context.Context, userID string) ([]*dtos.OrderUserDTOOutput, error) {
	rowsOrders, err := r.db.Query(ctx, getOrdersByUserID, userID)
	if err != nil {
		r.l.Errorf("ERROR while get orders %s: %v", getOrdersByUserID, err)
	}

	defer rowsOrders.Close()

	ordersDto := make([]*dtos.OrderUserDTOOutput, 0)

	for rowsOrders.Next() {
		var order models.Order

		err := rowsOrders.Scan(
			&order.ID,
			&order.Price,
			&order.Status,
			&order.CreationTime,
			&order.DeliveryTime,
			&order.ClientId,
			&order.CourierId,
		)
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
			err := rowsOrdersProduct.Scan(&orderProduct.Amount, &orderProduct.OrderId, &orderProduct.ProductId)
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
		var order models.Order
		err := rowsOrders.Scan(&order.ID,
			&order.Price,
			&order.Status,
			&order.CreationTime,
			&order.DeliveryTime,
			&order.ClientId,
			&order.CourierId,
		)
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
			err := rowsOrdersProduct.Scan(&orderProduct.Amount, &orderProduct.OrderId, &orderProduct.ProductId)
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
		err = rows.Scan(&order.ID, &order.Price, &order.Status, &order.CreationTime, &order.DeliveryTime, &order.ClientID)
		if err != nil {
			r.l.Errorf("error getting free orders from db: %v", err)
			return nil, err
		}
		orders = append(orders, order)
	}
	r.l.Info("get free orders from db")
	return orders, nil
}

func (r *Repository) SetOrderTaken(ctx context.Context, orderID, courierID string) (models.Order, error) {
	_, err := r.db.Exec(ctx, setOrderTakenQuery, statusTaken, courierID, orderID)
	if err != nil {
		r.l.Errorf("error setting status taken in db: %v", err)
		return models.Order{}, err
	}
	var order models.Order
	err = r.db.QueryRow(ctx, selectOrderById, orderID).Scan(&order.ID, &order.Price, &order.Status, &order.CreationTime,
		&order.DeliveryTime, &order.ClientId, &order.CourierId)
	if err != nil {
		r.l.Errorf("error selecting order by id from db: %v", err)
		return models.Order{}, err
	}
	return order, nil
}

func (r *Repository) SetOrderFinished(ctx context.Context, orderID, courierID string) (models.Order, error) {
	_, err := r.db.Exec(ctx, setOrderFinishedQuery, statusFinished, courierID, orderID)
	if err != nil {
		r.l.Errorf("error setting status finished in db: %v", err)
		return models.Order{}, err
	}
	var order models.Order
	err = r.db.QueryRow(ctx, selectOrderById, orderID).Scan(&order.ID, &order.Price, &order.Status, &order.CreationTime,
		&order.DeliveryTime, &order.ClientId, &order.CourierId)
	if err != nil {
		r.l.Errorf("error selecting order by id from db: %v", err)
		return models.Order{}, err
	}
	return order, nil
}
