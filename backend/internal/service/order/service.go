package order

import (
	"context"
	"delivery-bug/internal/dtos"
	orderRepo "delivery-bug/internal/repo/order"
	"delivery-bug/pkg/logging"
)

type OrderService interface {
	CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (string, error)
	GetOrdersByUserID(ctx context.Context, userID string) ([]*dtos.OrderUserDTOOutput, error)
	GetOrdersByCourierID(ctx context.Context, courierID string) ([]*dtos.OrderCourierDTOOutput, error)
}

type Service struct {
	repo orderRepo.OrdersRepository
	l    *logging.Logger
}

func NewService(repo orderRepo.OrdersRepository, l logging.Logger) *Service {
	return &Service{repo: repo, l: &l}
}

func (s *Service) CreateOrder(ctx context.Context, order *dtos.OrderDTOInput) (string, error) {
	return s.repo.CreateOrder(ctx, order)
}

func (s *Service) GetOrdersByUserID(ctx context.Context, userID string) ([]*dtos.OrderUserDTOOutput, error) {
	return s.repo.GetOrdersByUserID(ctx, userID)
}

func (s *Service) GetOrdersByCourierID(ctx context.Context, courierID string) ([]*dtos.OrderCourierDTOOutput, error) {
	return s.repo.GetOrdersByCourierID(ctx, courierID)
}
