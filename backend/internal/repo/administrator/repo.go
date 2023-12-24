package administrator

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AdministratorsRepository interface {
	CheckLogin(ctx context.Context, login string) (models.AdministratorsLoginForm, error)
	CheckLoginTaken(ctx context.Context, login string) error
	InsertAdministratorQuery(ctx context.Context, administratorDto dtos.AdministratorDTO) (string, error)
	InsertLoginForm(ctx context.Context, form models.AdministratorsLoginForm) error
	CheckPassPhrase(ctx context.Context, passphrase string) error
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CheckLogin(ctx context.Context, login string) (models.AdministratorsLoginForm, error) {
	var result models.AdministratorsLoginForm
	err := r.db.QueryRow(ctx, selectLoginFormQuery, login).Scan(&result.Login, &result.Password, &result.AdministratorId)

	if err != nil {
		return models.AdministratorsLoginForm{}, err
	} else if errors.Is(err, errors.New("no rows in result set")) {
		return models.AdministratorsLoginForm{}, errors.New("there's no user with such login")
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

func (r *Repository) InsertAdministratorQuery(ctx context.Context, administratorDto dtos.AdministratorDTO) (string, error) {
	var insertedAdminID string
	err := r.db.QueryRow(ctx, insertAdministratorQuery, administratorDto.FirstName, administratorDto.Surname,
		administratorDto.LastName).Scan(&insertedAdminID)
	if err != nil {
		r.l.Errorf("ERROR while inserting administrator %s %s %s in db: %v",
			administratorDto.FirstName, administratorDto.Surname, administratorDto.LastName, err)
		return "", err
	}
	r.l.Infof("insert user %s %s %s in db", administratorDto.FirstName, administratorDto.Surname, administratorDto.LastName)
	return insertedAdminID, nil
}

func (r *Repository) InsertLoginForm(ctx context.Context, form models.AdministratorsLoginForm) error {
	_, err := r.db.Exec(ctx, insertLoginFormQuery,
		form.Login,
		form.Password,
		form.AdministratorId,
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
		r.l.Infof("ERROR while checking passphrase %s %v", passphrase, err)
		return err
	}

	return nil
}
