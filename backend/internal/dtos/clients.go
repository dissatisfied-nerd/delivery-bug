package dtos

type ClientDTO struct {
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Balance   float64 `json:"balance"`
}

type AddressDTO struct {
	City      string `json:"city"`
	Street    string `json:"street"`
	Building  int    `json:"building"`
	Entrance  int    `json:"entrance"`
	Floor     int    `json:"floor"`
	Apartment int    `json:"apartment"`
}

type ClientInfo struct {
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Balance   float64 `json:"balance"`
	City      string  `json:"city"`
	Street    string  `json:"street"`
	Building  int     `json:"building"`
	Entrance  int     `json:"entrance"`
	Floor     int     `json:"floor"`
	Apartment int     `json:"apartment"`
}
