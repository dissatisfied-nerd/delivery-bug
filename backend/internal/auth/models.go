package auth

import (
	"github.com/golang-jwt/jwt"
	"time"
)

type SignUpInput struct {
	Login     string `json:"login"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	City      string `json:"city"`
	Street    string `json:"street"`
	Building  int    `json:"building"`
	Entrance  int    `json:"entrance"`
	Floor     int    `json:"floor"`
	Apartment int    `json:"apartment"`
}

type SignInInput struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type Claims struct {
	UserID    string `json:"user_id"`
	IssuedAt  int64  `json:"iat"`
	ExpiresAt int64  `json:"exp"`
}

func (c *Claims) Valid() error {
	if c.ExpiresAt < time.Now().Unix() {
		return jwt.ErrSignatureInvalid
	}
	return nil
}
