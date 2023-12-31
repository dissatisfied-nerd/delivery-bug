package user

import (
	"context"
	"delivery-bug/internal/auth"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/internal/repo/user"
	"delivery-bug/pkg/logging"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

type UsersService interface {
	CreateUser(ctx context.Context, input auth.SignUpInput) (string, error)
	CheckUser(ctx context.Context, input auth.SignInInput) (string, error)
	GetInfoById(ctx context.Context, id string) (dtos.ClientInfo, error)
}

type Service struct {
	repo user.UsersRepository
	l    *logging.Logger
}

func NewService(repo user.UsersRepository, l logging.Logger) *Service {
	return &Service{repo: repo, l: &l}
}

func (s *Service) CheckUser(ctx context.Context, input auth.SignInInput) (string, error) {
	form, err := s.repo.CheckLogin(ctx, input.Login)
	if err != nil {
		s.l.Error("there is no user with such login")
		return "", errors.New("there is no user with such login")
	}

	err = bcrypt.CompareHashAndPassword([]byte(form.Password), []byte(input.Password))
	if err != nil {
		s.l.Error("invalid password")
		return "", errors.New("invalid password")
	}

	return form.ClientId, nil
}

func (s *Service) CreateUser(ctx context.Context, input auth.SignUpInput) (string, error) {
	err := s.repo.CheckLoginTaken(ctx, input.Login)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		s.l.Error(err)
		return "", err
	}

	address := dtos.AddressDTO{City: input.City, Street: input.Street, Building: input.Building,
		Entrance: input.Entrance, Floor: input.Floor, Apartment: input.Apartment}
	addressID, err := s.repo.InsertAddress(ctx, address)
	if err != nil {
		return "", err
	}

	client := dtos.ClientDTO{FirstName: input.FirstName, LastName: input.LastName, Balance: 0}
	userID, err := s.repo.InsertUser(ctx, client, addressID)
	if err != nil {
		return "", err
	}

	password := input.Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		s.l.Errorf("ERROR while genering password : %v", err)
		return "", err
	}

	form := models.ClientsLoginForm{Login: input.Login, Password: string(hashedPassword), ClientId: userID}
	err = s.repo.InsertLoginForm(ctx, form)
	if err != nil {
		return "", err
	}

	return userID, nil
}

func (s *Service) GetInfoById(ctx context.Context, id string) (dtos.ClientInfo, error) {
	return s.repo.SelectInfoById(ctx, id)
}
