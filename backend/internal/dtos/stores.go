package dtos

type StoreDTO struct {
<<<<<<< HEAD
	Name string `json:"name"`
}

type StoreInfo struct {
	Name      string `json:"name"`
=======
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

>>>>>>> f87e315 (stores repo done)
	City      string `json:"city"`
	Street    string `json:"street"`
	Building  int    `json:"building"`
	Entrance  int    `json:"entrance"`
	Floor     int    `json:"floor"`
	Apartment int    `json:"apartment"`
}
