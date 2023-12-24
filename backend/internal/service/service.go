package service

import (
	"delivery-bug/internal/repo"
	"delivery-bug/internal/service/administrator"
	"delivery-bug/internal/service/courier"
	"delivery-bug/internal/service/store"
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
)

type Service struct {
	UserService          user.UsersService
	CourierService       courier.CouriersService
	StoreService         store.StoresService
	AdministratorService administrator.AdministratorService
}

func NewService(repo repo.Repository, l logging.Logger) Service {
	return Service{
		UserService:          user.NewService(repo.UserRepo, l),
		CourierService:       courier.NewService(repo.CourierRepo, l),
		StoreService:         store.NewService(repo.StoreRepo, l),
		AdministratorService: administrator.NewService(repo.AdministratorRepo, l),
	}
}
