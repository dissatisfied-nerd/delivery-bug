package user

import (
	"context"
	"delivery-bug/pkg/dtos"
	"delivery-bug/pkg/logging"
	"delivery-bug/pkg/models"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UsersRepository interface {
	InsertAddress(ctx context.Context, addressDto dtos.AddressDTO) (string, error)
	InsertUser(ctx context.Context, clientDto dtos.ClientDTO, addressID string) (string, error)
	InsertLoginForm(ctx context.Context, form models.LoginForm) error
}

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{db: db}
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
	r.l.Infof("insert loginform %s in db")
	return nil
}
