package dtos

type StoreDTO struct {
	Name string `json:"name"`
}

type StoreInfo struct {
	Name      string `json:"name"`
	City      string `json:"city"`
	Street    string `json:"street"`
	Building  int    `json:"building"`
	Entrance  int    `json:"entrance"`
	Floor     int    `json:"floor"`
	Apartment int    `json:"apartment"`
}
