package admin

import (
	"context"
	"delivery-bug/internal/auth"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/internal/repo/admin"
	"delivery-bug/pkg/logging"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type AdminService interface {
	CreateAdmin(ctx context.Context, input auth.SignUpAdminInput) (string, error)
	CheckAdmin(ctx context.Context, input auth.SignInInput) (string, error)
}

type Service struct {
	repo admin.AdminsRepository
	l    *logging.Logger
}

func NewService(repo admin.AdminsRepository, l logging.Logger) *Service {
	return &Service{repo: repo, l: &l}
}

func (s *Service) CheckAdmin(ctx context.Context, input auth.SignInInput) (string, error) {
	form, err := s.repo.CheckLogin(ctx, input.Login)
	if err != nil {
		s.l.Error("there is no admin with such login")
		return "", errors.New("there is no admin with such login")
	}

	err = bcrypt.CompareHashAndPassword([]byte(form.Password), []byte(input.Password))
	if err != nil {
		s.l.Error("invalid password")
		return "", errors.New("invalid password")
	}

	return form.AdminId, nil
}

func (s *Service) CreateAdmin(ctx context.Context, input auth.SignUpAdminInput) (string, error) {
	err := s.repo.CheckLoginTaken(ctx, input.Login)
	if err != nil && !errors.Is(err, errors.New("no rows in result set")) {
		s.l.Error(err)
		return "", err
	}

	err = s.repo.CheckPassPhrase(ctx, input.Passphrase)
	if err != nil {
		s.l.Error(err)
		return "", errors.New("no such passphrase")
	}

	admin := dtos.AdminDTO{FirstName: input.FirstName, Surname: input.Surname, LastName: input.LastName}
	adminID, err := s.repo.InsertAdminQuery(ctx, admin)
	if err != nil {
		return "", err
	}

	password := input.Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		s.l.Errorf("ERROR while genering password : %v", err)
		return "", err
	}

	form := models.AdminsLoginForm{Login: input.Login, Password: string(hashedPassword), AdminId: adminID}
	err = s.repo.InsertLoginForm(ctx, form)
	if err != nil {
		return "", err
	}

	return adminID, nil
}
