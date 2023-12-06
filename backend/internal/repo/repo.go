package repo

import (
	"delivery-bug/internal/repo/courier"
	"delivery-bug/internal/repo/order"
	"delivery-bug/internal/repo/user"
	"delivery-bug/pkg/logging"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	UserRepo    user.UsersRepository
	CourierRepo courier.CouriersRepository
	OrderRepo   order.OrdersRepository
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) Repository {
	return Repository{
		UserRepo:    user.NewRepository(db, l),
		CourierRepo: courier.NewRepository(db, l),
		OrderRepo:   order.NewRepository(db, l),
	}
}
