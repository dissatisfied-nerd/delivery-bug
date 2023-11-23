package dtos

type ClientDTO struct {
	FirstName string
	LastName  string
	Balance   float64
}

type AddressDTO struct {
	City      string
	Street    string
	Building  int
	Entrance  int
	Floor     int
	Apartment int
}
