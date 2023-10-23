package model

import (
	"github.com/google/uuid"
)

type Products struct {
	id uuid.UUID `db:"id"`

	name        string  `db:"name"`
	price       float32 `db:"prive"`
	weight      float32 `db:"weight"`
	description string  `db:"description"`
	image       []byte  `db:"image"`
}
