package main // tmeplate

import (
	"log"
	"math/rand"

	_ "github.com/dissatisfied-nerd/delivery-bug/pkg/model"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func randFloat(min, max float64, n int) []float64 {
	res := make([]float64, n)
	for i := range res {
		res[i] = min + rand.Float64()*(max-min)
	}
	return res
}

func randInt(min, max int) int {
	return rand.Intn(max-min) + min
}

func main() {
	names := [5]string{"Sofa", "Table", "Chair", "Closet", "Door"}
	prices := randFloat(1, 10, 5)
	weights := randFloat(1, 10, 5)

	db, err := sqlx.Connect("postgres", "user=postgres password=postgres dbname=delivery_bug sslmode=disable")

	if err != nil {
		log.Fatalf("[GENERATOR]: %f", err)
	}

	db.Ping()

	numOfLines := 10

	for idx := 0; idx < numOfLines; idx++ {
		query := "INSERT INTO products (name, price, weight) VALUES ($1, $2, $3)"

		name := names[randInt(0, 5)]
		price := prices[randInt(0, 5)]
		weight := weights[randInt(0, 5)]

		_, err := db.Exec(query, name, price, weight)

		if err != nil {
			log.Fatalf("[INSERT]: %f", err)
		}
	}
}
