package config

import "delivery-bug/pkg/storage/postgres"

type Config struct {
	Host     string `config:"HOST" yaml:"host"`
	Port     string `config:"PORT" yaml:"port"`
	Database postgres.Config
}
