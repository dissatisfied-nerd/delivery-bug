package postgres

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"os"
)

func NewPoolConfig() (*pgxpool.Config, error) {
	connStr := os.Getenv("DB_CONNECTION_URL")

	poolConfig, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		return nil, err
	}

	return poolConfig, nil
}

func ConnectDB(config *pgxpool.Config) (*pgxpool.Pool, error) {
	conn, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return nil, err
	}
	return conn, nil
}
