package auth

import (
	"time"

	"github.com/golang-jwt/jwt"
)

type ClientSignUpInput struct {
	Login     string `json:"login" validate:"required"`
	Password  string `json:"password" validate:"required"`
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	City      string `json:"city" validate:"required"`
	Street    string `json:"street" validate:"required"`
	Building  int    `json:"building" validate:"required"`
	Entrance  int    `json:"entrance" validate:"required"`
	Floor     int    `json:"floor" validate:"required"`
	Apartment int    `json:"apartment" validate:"required"`
}

type CourierSignUpInput struct {
	Login        string `json:"login" validate:"required"`
	Password     string `json:"password" validate:"required"`
	FirstName    string `json:"first_name" validate:"required"`
	LastName     string `json:"last_name" validate:"required"`
	City         string `json:"city" validate:"required"`
	Street       string `json:"street" validate:"required"`
	Building     int    `json:"building" validate:"required"`
	Entrance     int    `json:"entrance" validate:"required"`
	Floor        int    `json:"floor" validate:"required"`
	Apartment    int    `json:"apartment" validate:"required"`
	Registration bool   `json:"registration" validate:"required"`
}

type SignInInput struct {
	Login    string `json:"login" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type Claims struct {
	ID        string `json:"id"`
	Role      string `json:"role"`
	IssuedAt  int64  `json:"iat"`
	ExpiresAt int64  `json:"exp"`
}

func (c *Claims) Valid() error {
	if c.ExpiresAt < time.Now().Unix() {
		return jwt.ErrSignatureInvalid
	}
	return nil
}
