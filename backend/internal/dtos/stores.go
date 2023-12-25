package dtos

type StoreDTO struct {
	Name       string `json:"name"`
	FirstName  string `json:"first_name"`
	MiddleName string `json:"middle_name"`
	LastName   string `json:"last_name"`
}

type StoreInfo struct {
	Name       string `json:"name"`
	FirstName  string `json:"first_name"`
	MiddleName string `json:"middle_name"`
	LastName   string `json:"last_name"`
	City       string `json:"city"`
	Street     string `json:"street"`
	Building   int    `json:"building"`
	Entrance   int    `json:"entrance"`
	Floor      int    `json:"floor"`
	Apartment  int    `json:"apartment"`
}
