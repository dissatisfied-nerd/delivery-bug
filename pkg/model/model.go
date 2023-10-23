package model

import (
	"github.com/google/uuid"
)

type Products struct {
	id uuid.UUID

	name        string
	price       float32
	weight      float32
	description string
	image       []byte
}
