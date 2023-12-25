package dtos

import (
	"errors"
	"strconv"
)

type ProductDTO struct {
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Weight      float64 `json:"weight"`
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

func ToProductDTO(input ProductDTOInput) (ProductDTO, error) {
	var result ProductDTO

	price, err := strconv.ParseFloat(input.Price, 64)
	if err != nil {
		return result, errors.New("ERROR while converting price")
	}
	weight, err := strconv.ParseFloat(input.Weight, 64)
	if err != nil {
		return result, errors.New("ERROR while converting price")
	}

	result.Name = input.Name
	result.Price = price
	result.Weight = weight
	result.Description = input.Description
	result.Image = input.Image

	return result, nil
}
