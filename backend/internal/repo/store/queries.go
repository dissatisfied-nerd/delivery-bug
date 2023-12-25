package store

const (
	insertAddressQuery = `INSERT INTO addresses(city, street, building, entrance, floor, apartment)
    	VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	insertStoreQuery = `INSERT INTO stores(name, first_name, middle_name, last_name, address_id) 
		VALUES($1, $2, $3, $4, $5) RETURNING id`
	insertLoginFormQuery = `INSERT INTO stores_loginform(login, password, store_id) 
		VALUES ($1, $2, $3)`
	checkLoginQuery = `SELECT login, password, store_id 
		FROM stores_loginform 
		WHERE login=$1`
	selectStoreQuery = `SELECT name, first_name, middle_name, last_name, address_id 
		FROM stores 
		WHERE id=$1`
	selectAddressQuery = `SELECT city, street, building, entrance, floor, apartment 
		FROM addresses 
		WHERE id=$1`
)
