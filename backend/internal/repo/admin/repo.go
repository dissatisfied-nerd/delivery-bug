package admin

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AdminsRepository interface {
	CheckLogin(ctx context.Context, login string) (models.AdminsLoginForm, error)
	CheckLoginTaken(ctx context.Context, login string) error
	InsertAdminQuery(ctx context.Context, adminDto dtos.AdminDTO) (string, error)
	InsertLoginForm(ctx context.Context, form models.AdminsLoginForm) error
	CheckPassPhrase(ctx context.Context, passphrase string) error
	SelectInfoById(ctx context.Context, adminID string) (dtos.AdminDTO, error)
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CheckLogin(ctx context.Context, login string) (models.AdminsLoginForm, error) {
	var result models.AdminsLoginForm
	err := r.db.QueryRow(ctx, selectLoginFormQuery, login).Scan(&result.Login, &result.Password, &result.AdminId)

	if err != nil {
		return models.AdminsLoginForm{}, err
	} else if errors.Is(err, errors.New("no rows in result set")) {
		return models.AdminsLoginForm{}, errors.New("there's no user with such login")
	}

	return result, nil
}

func (r *Repository) CheckLoginTaken(ctx context.Context, login string) error {
	rows, _ := r.db.Query(ctx, selectLoginFormQuery, login)
	defer rows.Close()
	if rows.Next() {
		return errors.New("login has already been taken")
	} else {
		return nil
	}
}

func (r *Repository) InsertAdminQuery(ctx context.Context, adminDto dtos.AdminDTO) (string, error) {
	var insertedAdminID string
	err := r.db.QueryRow(ctx, insertAdminQuery, adminDto.FirstName, adminDto.MiddleName,
		adminDto.LastName).Scan(&insertedAdminID)
	if err != nil {
		r.l.Errorf("ERROR while inserting admin %s %s %s in db: %v",
			adminDto.FirstName, adminDto.MiddleName, adminDto.LastName, err)
		return "", err
	}
	r.l.Infof("insert user %s %s %s in db", adminDto.FirstName, adminDto.MiddleName, adminDto.LastName)
	return insertedAdminID, nil
}

func (r *Repository) InsertLoginForm(ctx context.Context, form models.AdminsLoginForm) error {
	_, err := r.db.Exec(ctx, insertLoginFormQuery,
		form.Login,
		form.Password,
		form.AdminId,
	)
	if err != nil {
		r.l.Errorf("ERROR while inserting loginform %s in db: %v", form.Login, err)
		return err
	}
	r.l.Infof("insert loginform %s in db", form.Login)
	return nil
}

func (r *Repository) CheckPassPhrase(ctx context.Context, passphrase string) error {
	var passphraseId string
	err := r.db.QueryRow(ctx, selectPassPhraseQuery, passphrase).Scan(&passphraseId)

	if errors.Is(err, errors.New("no rows in result set")) {
		r.l.Infof("No such passphrase %s", passphrase)
		return err
	} else if err != nil {
		r.l.Errorf("ERROR while checking passphrase %s %v", passphrase, err)
		return err
	}

	return nil
}

func (r *Repository) SelectInfoById(ctx context.Context, adminID string) (dtos.AdminDTO, error) {
	var adminDto dtos.AdminDTO
	err := r.db.QueryRow(ctx, selectAdminQuery, adminID).Scan(&adminDto.FirstName,
		&adminDto.MiddleName, &adminDto.LastName)

	if err != nil {
		r.l.Errorf("ERROR while selecting admin %s %v", adminID, err)
		return adminDto, err
	}

	r.l.Infof("selected admin with id %s", adminID)
	return adminDto, nil
}
