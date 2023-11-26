package config

import (
	"delivery-bug/internal/auth"
	"delivery-bug/pkg/storage/postgres"
)

type Config struct {
	Host     string `config:"HOST" yaml:"host" validate:"required"`
	Port     string `config:"PORT" yaml:"port" validate:"required"`
	Database postgres.Config
	Auth     auth.Config
}
