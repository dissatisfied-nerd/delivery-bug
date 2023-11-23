package models

import (
	"time"

	"github.com/google/uuid"
)

type Addresses struct {
	Id uuid.UUID `db:"id"`

	City      string `db:"city"`
	Street    string `db:"street"`
	Building  int    `db:"buildng"`
	Entrance  int    `db:"entrance"`
	Floor     int    `db:"floor"`
	Apartment int    `db:"apartment"`
}

type Clients struct {
	Id uuid.UUID `db:"id"`

	FirstName string  `db:"first_name"`
	LastName  string  `db:"last_name"`
	Balance   float64 `db:"balance"`

	AddressId uuid.UUID `db:"address_id"`
}

type LoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	ClientId uuid.UUID `db:"client_id"`
}

type Couriers struct {
	Id uuid.UUID `db:"id"`

	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Propiska  bool   `db:"propiska"`
}

type Stores struct {
	Id uuid.UUID `db:"id"`

	Reputation float64 `db:"reputation"`
	Name       string  `db:"name"`
}

type Tags struct {
	Id uuid.UUID `db:"id"`

	Tag string `db:"tag"`
}

type Products struct {
	Id uuid.UUID `db:"id"`

	Name        string  `db:"name"`
	Price       float32 `db:"prive"`
	Weight      float32 `db:"weight"`
	Description string  `db:"description"`
	Image       []byte  `db:"image"`
}

type ProductsStores struct {
	ProductId uuid.UUID `db:"product_id"`
	StoreId   uuid.UUID `db:"store_id"`
}

type ProductsTags struct {
	ProductId uuid.UUID `db:"product_id"`
	TagId     uuid.UUID `db:"tag_id"`
}

type Orders struct {
	Id uuid.UUID `db:"id"`

	Name         string    `db:"name"`
	CreationTime time.Time `db:"creation_time"`
	DeliveryTime time.Time `db:"delivery_time"`

	ClientId  uuid.UUID `db:"client_id"`
	CourierId uuid.UUID `db:"courier_id"`
	ProductID uuid.UUID `db:"product_id"`
}

type Basket struct {
	Amount int `db:"amount"`

	OrderId   uuid.UUID `db:"order_id"`
	ProductId uuid.UUID `db:"product_id"`
}

type Reviews struct {
	Id uuid.UUID `db:"id"`

	Mark int `db:"mark"`

	ClientId  uuid.UUID `db:"client_id"`
	OrderId   uuid.UUID `db:"order_id"`
	ProductId uuid.UUID `db:"product_id"`
}
