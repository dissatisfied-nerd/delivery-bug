package user

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"errors"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UsersRepository interface {
	CheckLogin(ctx context.Context, login string) (models.LoginForm, error)
	CheckLoginTaken(ctx context.Context, login string) error
	InsertAddress(ctx context.Context, addressDto dtos.AddressDTO) (string, error)
	InsertUser(ctx context.Context, clientDto dtos.ClientDTO, addressID string) (string, error)
	InsertLoginForm(ctx context.Context, form models.LoginForm) error
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CheckLogin(ctx context.Context, login string) (models.LoginForm, error) {
	var result models.LoginForm
	err := r.db.QueryRow(ctx, checkLoginQuery, login).Scan(&result.Login, &result.Password, &result.ClientId)
	if err != nil {
		return models.LoginForm{}, err
	} else if err == errors.New("no rows in result set") {
		return models.LoginForm{}, errors.New("there's no user with such login")
	}
	return result, nil
}

func (r *Repository) CheckLoginTaken(ctx context.Context, login string) error {
	rows, _ := r.db.Query(ctx, checkLoginQuery, login)
	defer rows.Close()
	if rows.Next() {
		return errors.New("login has already been taken")
	} else {
		return nil
	}
}

func (r *Repository) InsertAddress(ctx context.Context, addressDto dtos.AddressDTO) (string, error) {
	var insertedAddressId string
	err := r.db.QueryRow(ctx, insertAddressQuery,
		addressDto.City,
		addressDto.Street,
		addressDto.Building,
		addressDto.Entrance,
		addressDto.Floor,
		addressDto.Apartment,
	).Scan(&insertedAddressId)
	if err != nil {
		r.l.Errorf("ERROR while inserting address %s, %s, %d in db: %v", addressDto.City, addressDto.Street,
			addressDto.Building, err)
		return "", err
	}
	r.l.Infof("insert address %s, %s, %d in db", addressDto.City, addressDto.Street,
		addressDto.Building)
	return insertedAddressId, nil
}

func (r *Repository) InsertUser(ctx context.Context, clientDto dtos.ClientDTO, addressID string) (string, error) {
	var insertedUserID string
	err := r.db.QueryRow(ctx, insertClientQuery, clientDto.FirstName, clientDto.LastName, clientDto.Balance,
		addressID).Scan(&insertedUserID)
	if err != nil {
		r.l.Errorf("ERROR while inserting user %s %s in db: %v", clientDto.FirstName, clientDto.LastName, err)
		return "", err
	}
	r.l.Infof("insert user %s %s in db", clientDto.FirstName, clientDto.LastName)
	return insertedUserID, nil
}

func (r *Repository) InsertLoginForm(ctx context.Context, form models.LoginForm) error {
	_, err := r.db.Exec(ctx, insertLoginFormQuery,
		form.Login,
		form.Password,
		form.ClientId,
	)
	if err != nil {
		r.l.Errorf("ERROR while inserting loginform %s in db: %v", form.Login, err)
		return err
	}
	r.l.Infof("insert loginform %s in db", form.Login)
	return nil
}
