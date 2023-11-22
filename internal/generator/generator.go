package main // tmeplate

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"reflect"
	"strings"

	"github.com/dissatisfied-nerd/delivery-bug/pkg/model"
	_ "github.com/dissatisfied-nerd/delivery-bug/pkg/model"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func randInt(min, max int) int {
	return rand.Intn(max-min) + min
}

func randInts(min, max, n int) []int {
	res := make([]int, n)

	for i := range res {
		res[i] = randInt(min, max)
	}

	return res
}

func randFloat(min, max float64) float64 {
	return min + rand.Float64()*(max-min)
}

func randFloats(min, max float64, n int) []float64 {
	res := make([]float64, n)

	for i := range res {
		res[i] = randFloat(min, max)
	}

	return res
}

func GenerateAddresses(num int) []model.Address {
	city := [5]string{"Москва", "Санкт-Петербург", "Екатеринбург", "Нижний Новгород", "Казань"}
	street := [5]string{"ул. Ленина", "ул. Сталина", "ул. Хрущёва", "ул. Брежнева", "ул. Горбачёва"}
	building := randInts(1, 100, 5)
	entrance := randints(1, 12, 5)
	floor := randInts(1, 38, 5)
	apartment := randInts(1, 128, 5)

}

func generateQuery(tableName, data interface{}) (string, []interface{}) {
	var columns []string
	var variables []string
	var insertValues []interface{}

	dataValue := reflect.ValueOf(data)
	numOfFields := dataValue.NumField()
	dataType := dataValue.Type()

	for idx := 0; idx < numOfFields; idx++ {
		field := dataType.Field(idx)
		fieldValue := dataValue.Field(idx).Interface()

		if len(field.Tag.Get("db")) > 0 {
			var insertValue interface{}

			if len(field.Tag.Get("marsahl")) == 0 {
				insertValue = fieldValue
			} else {
				var err error

				insertValue, err = json.Marshal(fieldValue)

				if err != nil {
					log.Fatalf("DATABASE GENERATE QUERY: %f", err)
				}
			}

			columns = append(columns, field.Tag.Get("db"))
			variables = append(variables, fmt.Sprintf("$%d", len(columns)))
			insertValues = append(insertValues, insertValue)
		}
	}

	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)",
		tableName, strings.Join(columns, ", "), strings.Join(variables, ", "))

	return query, insertValues
}

func main() {
	names := [5]string{"Sofa", "Table", "Chair", "Closet", "Door"}
	prices := randFloats(1, 10, 5)
	weights := randFloats(1, 10, 5)

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
