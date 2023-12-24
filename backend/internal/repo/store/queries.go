package store

const (
	insertAddressQuery = `INSERT INTO addresses(city, street, building, entrance, floor, apartment)
    	VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	insertStoreQuery     = `INSERT INTO stores(name, address_id) VALUES($1, $2) RETURNING id`
	insertLoginFormQuery = `INSERT INTO stores_loginform(login, password, store_id) VALUES ($1, $2, $3)`
	checkLoginQuery      = `SELECT login, password, store_id FROM stores_loginform where login=$1`
	selectStoreQuery     = `SELECT name, address_id FROM couriers WHERE id=$1`
	selectAddressQuery   = `SELECT city, street, building, entrance, floor, apartment FROM addresses 
		WHERE id=$1`
)