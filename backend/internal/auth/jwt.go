package auth

import (
	"delivery-bug/pkg/logging"
	"github.com/golang-jwt/jwt"
	"time"
)

type Auth interface {
	GenerateJWT(userID string) (string, error)
	GetHost() string
}

type auth struct {
	Config Config
}

func NewAuth(config Config) Auth {
	return &auth{Config: config}
}

var log = logging.GetLogger()

func (a *auth) GenerateJWT(userID string) (string, error) {
	claims := &Claims{
		UserID:    userID,
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(time.Hour * 24 * 3).Unix(),
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := jwtToken.SignedString([]byte(a.Config.SecretKey))
	log.Debugf("signedToken: %s", signedToken)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func (a *auth) GetHost() string {
	return a.Config.Host
}
