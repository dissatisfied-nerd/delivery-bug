package courier

const (
	insertAddressQuery = `
	INSERT INTO addresses(city, street, building, entrance, floor, apartment)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
	`
	insertCourierQuery = `
	INSERT INTO couriers(first_name, last_name, address_id) 
	VALUES($1, $2, $3) RETURNING id
	`
	insertLoginFormQuery = `
	INSERT INTO couriers_loginform(login, password, courier_id) 
	VALUES ($1, $2, $3)
	`
	checkLoginQuery = `
	SELECT login, password, courier_id 
	FROM couriers_loginform 
	WHERE login=$1
	`
	selectCourierQuery = `
	SELECT first_name, last_name, address_id 
	FROM couriers 
	WHERE id=$1
	`
	selectAddressQuery = `
	SELECT city, street, building, entrance, floor, apartment 
	FROM addresses 
	WHERE id=$1
	`
)
