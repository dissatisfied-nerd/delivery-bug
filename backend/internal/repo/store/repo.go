package store

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
)

type StoresRepository interface {
	CheckLogin(ctx context.Context, login string) (models.StoresLoginForm, error)
	CheckLoginTaken(ctx context.Context, login string) error
	InsertAddress(ctx context.Context, addressDto dtos.AddressDTO) (string, error)
	InsertStore(ctx context.Context, storeDTO dtos.StoreDTO, addressID string) (string, error)
	InsertLoginForm(ctx context.Context, form models.StoresLoginForm) error
	SelectInfoByID(ctx context.Context, id string) (dtos.StoreInfo, error)
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CheckLogin(ctx context.Context, login string) (models.StoresLoginForm, error) {
	var result models.StoresLoginForm
	err := r.db.QueryRow(ctx, checkLoginQuery, login).Scan(&result.Login, &result.Password, &result.StoreID)
	if err != nil {
		return models.StoresLoginForm{}, err
	} else if errors.Is(err, errors.New("no rows in result set")) {
		return models.StoresLoginForm{}, errors.New("there's no store with such login")
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

func (r *Repository) InsertStore(ctx context.Context, storeDTO dtos.StoreDTO, addressID string) (string, error) {
	var insertedStoreID string
	err := r.db.QueryRow(ctx, insertStoreQuery,
		storeDTO.Reputation, storeDTO.Name, storeDTO.FirstName, storeDTO.Surname, storeDTO.LastName,
		addressID).Scan(&insertedStoreID)
	if err != nil {
		r.l.Errorf("error inserting store %s to db: %v", storeDTO.Name, err)
		return "", err
	}
	r.l.Infof("insert store %s to db", storeDTO.Name)
	return insertedStoreID, nil
}

func (r *Repository) InsertLoginForm(ctx context.Context, form models.StoresLoginForm) error {
	_, err := r.db.Exec(ctx, insertLoginFormQuery,
		form.Login,
		form.Password,
		form.StoreID,
	)
	if err != nil {
		r.l.Errorf("ERROR while inserting loginform %s in db: %v", form.Login, err)
		return err
	}
	r.l.Infof("insert loginform %s in db", form.Login)
	return nil
}

func (r *Repository) SelectInfoByID(ctx context.Context, id string) (dtos.StoreInfo, error) {
	var info dtos.StoreInfo
	var addressID string
	err := r.db.QueryRow(ctx, selectStoreQuery, id).Scan(&info.Reputation, &info.Name, &info.FirstName,
		&info.Surname, &info.LastName, &addressID)
	if err != nil {
		r.l.Errorf("error getting store info %s: %v", id, err)
		return dtos.StoreInfo{}, err
	}
	err = r.db.QueryRow(ctx, selectAddressQuery, addressID).Scan(&info.City, &info.Street, &info.Building,
		&info.Entrance, &info.Floor, &info.Apartment)
	if err != nil {
		r.l.Errorf("error getting address %s: %v", addressID, err)
		return dtos.StoreInfo{}, err
	}
	r.l.Infof("get store info %s from db", id)
	return info, nil
}
