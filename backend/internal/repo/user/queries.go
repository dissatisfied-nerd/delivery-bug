package user

const (
	checkLoginQuery = `
		SELECT login, password, client_id
		FROM clients_loginform WHERE login=$1
	`
	insertAddressQuery = `
		INSERT INTO addresses(city, street, building, entrance, floor, apartment)
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
	`
	insertClientQuery = `
		INSERT INTO clients(first_name, last_name, balance, address_id) 
		VALUES($1, $2, $3, $4) RETURNING id
	`
	insertLoginFormQuery = `
		INSERT INTO clients_loginform(login, password, client_id) 
		VALUES ($1, $2, $3)
	`
	getClientQuery = `
		SELECT first_name, last_name, balance, address_id 
		FROM clients 
		WHERE id=$1
	`
	getAddressQuery = `
		SELECT city, street, building, entrance, floor, apartment 
		FROM addresses 
		WHERE id=$1
	`
)
