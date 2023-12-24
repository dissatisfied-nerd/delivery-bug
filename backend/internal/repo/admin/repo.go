package admin

import (
	"delivery-bug/pkg/logging"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
	l  *logging.Logger
}

func NewRepository(db *pgxpool.Pool, l logging.Logger) *Repository {
	return &Repository{db: db, l: &l}
}
