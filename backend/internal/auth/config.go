package auth

type Config struct {
	SecretKey string `config:"SECRET_KEY" json:"secret" validate:"required"`
	Host      string `config:"HOST" json:"host" validate:"required"`
}
