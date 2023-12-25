package dtos

type ProductDTO struct {
	Name        string  `json:"name"`
	Price       float32 `json:"price"`
	Weight      float32 `json:"weight"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
}

type ProductDTOInput struct {
	Name        string `json:"name"`
	Price       string `json:"price"`
	Weight      string `json:"weight"`
	Description string `json:"description"`
	Image       string `json:"image"`
}
