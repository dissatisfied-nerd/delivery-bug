package service

import (
	"delivery-bug/internal/repo"
	"delivery-bug/internal/service/courier"
	"delivery-bug/internal/service/order"
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
)

type Service struct {
	UserService    user.UsersService
	CourierService courier.CouriersService
	OrderService   order.OrderService
}

func NewService(repo repo.Repository, l logging.Logger) Service {
	return Service{
		UserService:    user.NewService(repo.UserRepo, l),
		CourierService: courier.NewService(repo.CourierRepo, l),
		OrderService:   order.NewService(repo.OrderRepo, l),
	}
}
