package administrator

import (
	"context"
	"delivery-bug/internal/auth"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/internal/repo/administrator"
	"delivery-bug/pkg/logging"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type AdministratorService interface {
	CreateAdministrator(ctx context.Context, input auth.SignUpAdministrator) (string, error)
	CheckAdministrator(ctx context.Context, input auth.SignInInput) (string, error)
}

type Service struct {
	repo administrator.AdministratorsRepository
	l    *logging.Logger
}

func NewService(repo administrator.AdministratorsRepository, l logging.Logger) *Service {
	return &Service{repo: repo, l: &l}
}

func (s *Service) CheckAdministrator(ctx context.Context, input auth.SignInInput) (string, error) {
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

	return form.AdministratorId, nil
}

func (s *Service) CreateAdministrator(ctx context.Context, input auth.SignUpAdministrator) (string, error) {
	err := s.repo.CheckLoginTaken(ctx, input.Login)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		s.l.Error(err)
		return "", err
	}

	admin := dtos.AdministratorDTO{FirstName: input.FirstName, Surname: input.Surname, LastName: input.LastName}
	adminID, err := s.repo.InsertAdministratorQuery(ctx, admin)
	if err != nil {
		return "", err
	}

	password := input.Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		s.l.Errorf("ERROR while genering password : %v", err)
		return "", err
	}

	form := models.AdministratorsLoginForm{Login: input.Login, Password: string(hashedPassword), AdministratorId: adminID}
	err = s.repo.InsertLoginForm(ctx, form)
	if err != nil {
		return "", err
	}

	return adminID, nil
}
