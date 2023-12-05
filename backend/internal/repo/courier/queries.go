package courier

const (
	insertAddressQuery = `INSERT INTO addresses(city, street, building, entrance, floor, apartment)
    	VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	insertCourierQuery = `INSERT INTO couriers(first_name, last_name, registration, address_id) 
		VALUES($1, $2, $3, $4) RETURNING id`
	insertLoginFormQuery = `INSERT INTO couriers_loginform(login, password, courier_id) VALUES ($1, $2, $3)`
	checkLoginQuery      = `SELECT login, password, courier_id FROM couriers_loginform where login=$1`
)
