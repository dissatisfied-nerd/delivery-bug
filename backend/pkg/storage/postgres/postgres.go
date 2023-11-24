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

//func ConnectDB(cfg Config) (*pgxpool.Pool, error) {
//	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable pool_max_conns=%d",
//		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Database, cfg.PoolSize)
//
//	poolConfig, err := pgxpool.ParseConfig(dsn)
//	if err != nil {
//		return nil, err
//	}
//
//	conn, err := pgxpool.NewWithConfig(context.Background(), poolConfig)
//	if err != nil {
//		return nil, err
//	}
//	return conn, nil
//}
