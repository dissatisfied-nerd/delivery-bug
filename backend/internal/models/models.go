package models

import (
	"time"
)

type Addresses struct {
	ID string `db:"id"`

	City      string `db:"city"`
	Street    string `db:"street"`
	Building  int    `db:"building"`
	Entrance  int    `db:"entrance"`
	Floor     int    `db:"floor"`
	Apartment int    `db:"apartment"`
}

type Clients struct {
	ID string `db:"id"`

	FirstName string  `db:"first_name"`
	LastName  string  `db:"last_name"`
	Balance   float64 `db:"balance"`

	AddressId string `db:"address_id"`
}

type ClientsLoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	ClientId string `db:"client_id"`
}

type CouriersLoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	CourierId string `db:"courier_id"`
}

type Couriers struct {
	ID string `db:"id"`

	FirstName    string `db:"first_name"`
	LastName     string `db:"last_name"`
	Registration string `db:"registration"`
}

type Stores struct {
	ID string `db:"id"`

	Reputation float64 `db:"reputation"`
	Name       string  `db:"name"`
}

type Products struct {
	ID string `db:"id"`

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

type Orders struct {
	ID string `db:"id"`

	Price        float64    `db:"price"`
	CreationTime *time.Time `db:"creation_time"`
	DeliveryTime *time.Time `db:"delivery_time"`

	ClientId  string `db:"client_id"`
	CourierId string `db:"courier_id"`
}

type OrderProducts struct {
	Amount int `db:"amount"`

	OrderId   string `db:"order_id"`
	ProductId string `db:"product_id"`
}

type Reviews struct {
	ID string `db:"id"`

	Mark int `db:"mark"`

	ClientId  string `db:"client_id"`
	OrderId   string `db:"order_id"`
	ProductId string `db:"product_id"`
}
