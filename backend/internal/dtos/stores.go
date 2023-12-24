package dtos

type StoreDTO struct {
	Reputation int    `json:"reputation"`
	Name       string `json:"name"`
	FirstName  string `json:"first_name"`
	Surname    string `json:"surname"`
	LastName   string `json:"last_name"`
}

type StoreInfo struct {
	Reputation int    `json:"reputation"`
	Name       string `json:"name"`
	FirstName  string `json:"first_name"`
	Surname    string `json:"surname"`
	LastName   string `json:"last_name"`

	City      string `json:"city"`
	Street    string `json:"street"`
	Building  int    `json:"building"`
	Entrance  int    `json:"entrance"`
	Floor     int    `json:"floor"`
	Apartment int    `json:"apartment"`
}
