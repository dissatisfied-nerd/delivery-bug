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

type Couriers struct {
	ID string `db:"id"`

	FirstName    string `db:"first_name"`
	LastName     string `db:"last_name"`
	Registration string `db:"registration"`
}

type CouriersLoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	CourierId string `db:"courier_id"`
}

type Admins struct {
	ID string `db:"id"`

	FirstName  string `db:"first_name"`
	MiddleName string `db:"middle_name"`
	LastName   string `db:"last_name"`
}

type AdminsLoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	AdminId string `db:"administrator_id"`
}

type Stores struct {
	ID string `db:"id"`

	Reputation float64 `db:"reputation"`
	Name       string  `db:"name"`
	FirstName  string  `db:"first_name"`
	MiddleName string  `db:"middle_name"`
	LastName   string  `db:"last_name"`

	AddressId string `db:"address_id"`
}

type StoresLoginForm struct {
	Login string `db:"login"`

	Password string `db:"password"`

	StoreID string `db:"store_id"`
}

type Product struct {
	ID string `db:"id" json:"id"`

	Name        string  `db:"name" json:"name"`
	Price       float32 `db:"price" json:"price"`
	Weight      float32 `db:"weight" json:"weight"`
	Description string  `db:"description" json:"description"`
	Image       string  `db:"image" json:"image"`
	Quantity    int     `db:"quantity" json:"quantity"`

	StoreId string `db:"store_id"`
}

type Order struct {
	ID string `db:"id" json:"id"`

	Price        float64    `db:"price" json:"price"`
	Status       string     `db:"status" json:"status"`
	CreationTime *time.Time `db:"creation_time" json:"creation_time"`
	DeliveryTime *time.Time `db:"delivery_time" json:"delivery_time"`

	ClientId  string  `db:"client_id" json:"client_id"`
	CourierId *string `db:"courier_id" json:"courier_id"`
}

type OrderProducts struct {
	Amount int `db:"amount"`

	OrderId   string `db:"order_id"`
	ProductId string `db:"product_id"`
}
