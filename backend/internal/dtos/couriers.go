package dtos

type CourierDTO struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type CourierInfo struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	City      string `json:"city"`
	Street    string `json:"street"`
	Building  int    `json:"building"`
	Entrance  int    `json:"entrance"`
	Floor     int    `json:"floor"`
	Apartment int    `json:"apartment"`
}
