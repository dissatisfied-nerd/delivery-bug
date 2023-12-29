package dtos

type ProductDTO struct {
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Weight      float64 `json:"weight"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Quantity    int     `json:"quantity"`
}

type ProductDTOOutput struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Weight      float64 `json:"weight"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Quantity    int     `json:"quantity"`
	StoreName   string  `json:"store_name"`
}
