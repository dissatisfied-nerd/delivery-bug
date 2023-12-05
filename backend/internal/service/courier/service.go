package courier

import (
	"context"
	"delivery-bug/internal/auth"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	courierRepo "delivery-bug/internal/repo/courier"
	"delivery-bug/pkg/logging"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

type CouriersService interface {
	CheckCourier(ctx context.Context, input auth.SignInInput) (string, error)
	CreateCourier(ctx context.Context, input auth.CourierSignUpInput) (string, error)
}

type Service struct {
	repo courierRepo.CouriersRepository
	l    *logging.Logger
}

func NewService(repo courierRepo.CouriersRepository, l logging.Logger) *Service {
	return &Service{
		repo: repo,
		l:    &l,
	}
}

func (s *Service) CheckCourier(ctx context.Context, input auth.SignInInput) (string, error) {
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

	return form.CourierId, nil
}

func (s *Service) CreateCourier(ctx context.Context, input auth.CourierSignUpInput) (string, error) {
	err := s.repo.CheckLoginTaken(ctx, input.SignUpInput.Login)
	if err != nil && err != errors.New("no rows in result set") {
		s.l.Error(err)
		return "", err
	}

	address := dtos.AddressDTO{City: input.SignUpInput.City, Street: input.SignUpInput.Street,
		Building: input.SignUpInput.Building, Entrance: input.SignUpInput.Entrance, Floor: input.SignUpInput.Floor,
		Apartment: input.SignUpInput.Apartment}
	addressID, err := s.repo.InsertAddress(ctx, address)
	if err != nil {
		return "", err
	}

	courier := dtos.CourierDTO{FirstName: input.SignUpInput.FirstName, LastName: input.SignUpInput.LastName,
		Registration: true}
	courierID, err := s.repo.InsertCourier(ctx, courier, addressID)
	if err != nil {
		return "", err
	}

	password := input.SignUpInput.Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		s.l.Errorf("ERROR while genering password : %v", err)
		return "", err
	}

	form := models.CouriersLoginForm{Login: input.SignUpInput.Login, Password: string(hashedPassword), CourierId: courierID}
	err = s.repo.InsertLoginForm(ctx, form)
	if err != nil {
		return "", err
	}

	return courierID, nil
}
