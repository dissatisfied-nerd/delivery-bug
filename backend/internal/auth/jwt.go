package auth

import (
	"delivery-bug/pkg/logging"
	"github.com/golang-jwt/jwt"
	"time"
)

var log = logging.GetLogger()

func GenerateJWT(secret string, userID string) (string, error) {
	claims := &Claims{
		UserID:    userID,
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(time.Hour * 24 * 3).Unix(),
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := jwtToken.SignedString([]byte(secret))
	log.Debugf("signedToken: %s", signedToken)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
