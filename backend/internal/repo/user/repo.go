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
	SelectInfoById(ctx context.Context, id string) (dtos.ClientInfo, error)
	CheckLogin(ctx context.Context, login string) (models.ClientsLoginForm, error)
	CheckLoginTaken(ctx context.Context, login string) error
	InsertAddress(ctx context.Context, addressDto dtos.AddressDTO) (string, error)
	InsertUser(ctx context.Context, clientDto dtos.ClientDTO, addressID string) (string, error)
	InsertLoginForm(ctx context.Context, form models.ClientsLoginForm) error
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CheckLogin(ctx context.Context, login string) (models.ClientsLoginForm, error) {
	var result models.ClientsLoginForm
	err := r.db.QueryRow(ctx, checkLoginQuery, login).Scan(&result.Login, &result.Password, &result.ClientId)
	if err != nil {
		return models.ClientsLoginForm{}, err
	} else if errors.Is(err, errors.New("no rows in result set")) {
		return models.ClientsLoginForm{}, errors.New("there's no user with such login")
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

func (r *Repository) InsertLoginForm(ctx context.Context, form models.ClientsLoginForm) error {
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

func (r *Repository) SelectInfoById(ctx context.Context, id string) (dtos.ClientInfo, error) {
	var info dtos.ClientInfo
	var addressID string
	err := r.db.QueryRow(ctx, getClientQuery, id).Scan(&info.FirstName, &info.LastName, &info.Balance,
		&addressID)
	if err != nil {
		r.l.Errorf("error getting client info %s : %v", id, err)
		return dtos.ClientInfo{}, err
	}
	err = r.db.QueryRow(ctx, getAddressQuery, addressID).Scan(&info.City, &info.Street, &info.Building, &info.Entrance,
		&info.Floor, &info.Apartment)
	if err != nil {
		r.l.Errorf("error getting client info %s : %v", id, err)
		return dtos.ClientInfo{}, err
	}
	r.l.Infof("get client info %s from db", id)
	return info, nil
}
