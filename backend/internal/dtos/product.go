package dtos

type ProductDTO struct {
	ID string `json:"id"`

	Name        string  `json:"name"`
	Price       float32 `json:"price"`
	Weight      float32 `json:"weight"`
	Description string  `json:"description"`
	Image       []byte  `json:"image"`
}
