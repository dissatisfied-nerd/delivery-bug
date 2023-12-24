package store

import (
	"context"
	"delivery-bug/internal/auth"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	storeRepo "delivery-bug/internal/repo/store"
	"delivery-bug/pkg/logging"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

type StoresService interface {
	CheckStore(ctx context.Context, input auth.SignInInput) (string, error)
	CreateStore(ctx context.Context, input auth.SignUpStoreInput) (string, error)
	GetInfoByID(ctx context.Context, id string) (dtos.StoreInfo, error)
}

type Service struct {
	repo storeRepo.StoresRepository
	l    *logging.Logger
}

func NewService(repo storeRepo.StoresRepository, l logging.Logger) *Service {
	return &Service{
		repo: repo,
		l:    &l,
	}
}

func (s *Service) CheckStore(ctx context.Context, input auth.SignInInput) (string, error) {
	form, err := s.repo.CheckLogin(ctx, input.Login)
	if err != nil {
		s.l.Error("there is no store with such login")
		return "", errors.New("there is no user with such login")
	}

	err = bcrypt.CompareHashAndPassword([]byte(form.Password), []byte(input.Password))
	if err != nil {
		s.l.Error("invalid password")
		return "", errors.New("invalid password")
	}

	return form.StoreID, nil
}

func (s *Service) CreateStore(ctx context.Context, input auth.SignUpStoreInput) (string, error) {
	err := s.repo.CheckLoginTaken(ctx, input.Login)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		s.l.Error(err)
		return "", err
	}

	address := dtos.AddressDTO{City: input.City, Street: input.Street,
		Building: input.Building, Entrance: input.Entrance, Floor: input.Floor,
		Apartment: input.Apartment}
	addressID, err := s.repo.InsertAddress(ctx, address)
	if err != nil {
		return "", err
	}

	store := dtos.StoreDTO{Name: input.Name}
	storeID, err := s.repo.InsertStore(ctx, store, addressID)
	if err != nil {
		return "", err
	}

	password := input.Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		s.l.Errorf("ERROR while genering password : %v", err)
		return "", err
	}

	form := models.StoresLoginForm{Login: input.Login, Password: string(hashedPassword), StoreID: storeID}
	err = s.repo.InsertLoginForm(ctx, form)
	if err != nil {
		return "", err
	}

	return storeID, nil
}

func (s *Service) GetInfoByID(ctx context.Context, id string) (dtos.StoreInfo, error) {
	return s.repo.SelectInfoByID(ctx, id)
}
