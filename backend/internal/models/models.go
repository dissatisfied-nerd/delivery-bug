package models

import (
	"time"
)

type Addresses struct {
	Id string `db:"id"`

	City      string `db:"city"`
	Street    string `db:"street"`
	Building  int    `db:"building"`
	Entrance  int    `db:"entrance"`
	Floor     int    `db:"floor"`
	Apartment int    `db:"apartment"`
}

type Clients struct {
	Id string `db:"id"`

	FirstName string  `db:"first_name"`
	LastName  string  `db:"last_name"`
	Balance   float64 `db:"balance"`

	AddressId string `db:"address_id"`
}

type LoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	ClientId string `db:"client_id"`
}

type Couriers struct {
	Id string `db:"id"`

	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Propiska  bool   `db:"propiska"`
}

type Stores struct {
	Id string `db:"id"`

	Reputation float64 `db:"reputation"`
	Name       string  `db:"name"`
}

type Tags struct {
	Id string `db:"id"`

	Tag string `db:"tag"`
}

type Products struct {
	Id string `db:"id"`

	Name        string  `db:"name"`
	Price       float32 `db:"price"`
	Weight      float32 `db:"weight"`
	Description string  `db:"description"`
	Image       []byte  `db:"image"`
}

type ProductsStores struct {
	ProductId string `db:"product_id"`
	StoreId   string `db:"store_id"`
}

type ProductsTags struct {
	ProductId string `db:"product_id"`
	TagId     string `db:"tag_id"`
}

type Orders struct {
	Id string `db:"id"`

	Name         string    `db:"name"`
	CreationTime time.Time `db:"creation_time"`
	DeliveryTime time.Time `db:"delivery_time"`

	ClientId  string `db:"client_id"`
	CourierId string `db:"courier_id"`
	ProductID string `db:"product_id"`
}

type Basket struct {
	Amount int `db:"amount"`

	OrderId   string `db:"order_id"`
	ProductId string `db:"product_id"`
}

type Reviews struct {
	Id string `db:"id"`

	Mark int `db:"mark"`

	ClientId  string `db:"client_id"`
	OrderId   string `db:"order_id"`
	ProductId string `db:"product_id"`
}
