package courier

import (
	"context"
	"delivery-bug/internal/dtos"
	"delivery-bug/internal/models"
	"delivery-bug/pkg/logging"
	"errors"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CouriersRepository interface {
	InsertAddress(ctx context.Context, addressDto dtos.AddressDTO) (string, error)
	InsertCourier(ctx context.Context, courierDto dtos.CourierDTO, addressID string) (string, error)
	InsertLoginForm(ctx context.Context, form models.CouriersLoginForm) error
	CheckLoginTaken(ctx context.Context, login string) error
	CheckLogin(ctx context.Context, login string) (models.CouriersLoginForm, error)
	SelectInfoByID(ctx context.Context, id string) (dtos.CourierInfo, error)
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}

func (r *Repository) CheckLogin(ctx context.Context, login string) (models.CouriersLoginForm, error) {
	var result models.CouriersLoginForm
	err := r.db.QueryRow(ctx, checkLoginQuery, login).Scan(&result.Login, &result.Password, &result.CourierId)
	if err != nil {
		return models.CouriersLoginForm{}, err
	} else if errors.Is(err, errors.New("no rows in result set")) {
		return models.CouriersLoginForm{}, errors.New("there's no user with such login")
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

func (r *Repository) InsertCourier(ctx context.Context, courierDto dtos.CourierDTO, addressID string) (string, error) {
	var insertedCourierID string
	err := r.db.QueryRow(ctx, insertCourierQuery, courierDto.FirstName, courierDto.LastName,
		addressID).Scan(&insertedCourierID)
	if err != nil {
		r.l.Errorf("error inserting courier %s %s to db: %v", courierDto.FirstName, courierDto.LastName, err)
		return "", err
	}
	r.l.Infof("insert courier %s %s to db", courierDto.FirstName, courierDto.LastName)
	return insertedCourierID, nil
}

func (r *Repository) InsertLoginForm(ctx context.Context, form models.CouriersLoginForm) error {
	_, err := r.db.Exec(ctx, insertLoginFormQuery,
		form.Login,
		form.Password,
		form.CourierId,
	)
	if err != nil {
		r.l.Errorf("ERROR while inserting loginform %s in db: %v", form.Login, err)
		return err
	}
	r.l.Infof("insert loginform %s in db", form.Login)
	return nil
}

func (r *Repository) SelectInfoByID(ctx context.Context, id string) (dtos.CourierInfo, error) {
	var info dtos.CourierInfo
	var addressID string
	err := r.db.QueryRow(ctx, selectCourierQuery, id).Scan(&info.FirstName, &info.LastName, &addressID)
	if err != nil {
		r.l.Errorf("error getting courier info %s: %v", id, err)
		return dtos.CourierInfo{}, err
	}
	err = r.db.QueryRow(ctx, selectAddressQuery, addressID).Scan(&info.City, &info.Street, &info.Building,
		&info.Entrance, &info.Floor, &info.Apartment)
	if err != nil {
		r.l.Errorf("error getting address %s: %v", addressID, err)
		return dtos.CourierInfo{}, err
	}
	r.l.Infof("get courier info %s from db", id)
	return info, nil
}
