package auth

import (
	"time"

	"github.com/golang-jwt/jwt"
)

type SignUpInput struct {
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

type SignUpStoreInput struct {
	Login      string `json:"login" validate:"required"`
	Password   string `json:"password" validate:"required"`
	Name       string `json:"name" validate:"required"`
	FirstName  string `json:"first_name" validate:"required"`
	MiddleName string `json:"middle_name" validate:"required"`
	LastName   string `json:"last_name" validate:"required"`
	City       string `json:"city" validate:"required"`
	Street     string `json:"street" validate:"required"`
	Building   int    `json:"building" validate:"required"`
	Entrance   int    `json:"entrance" validate:"required"`
	Floor      int    `json:"floor" validate:"required"`
	Apartment  int    `json:"apartment" validate:"required"`
}

type SignUpAdminInput struct {
	Login      string `json:"login" validate:"required"`
	Password   string `json:"password" validate:"required"`
	FirstName  string `json:"first_name" validate:"required"`
	MiddleName string `json:"middle_name" validate:"required"`
	LastName   string `json:"last_name" validate:"required"`
	Passphrase string `json:"passphrase"`
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
