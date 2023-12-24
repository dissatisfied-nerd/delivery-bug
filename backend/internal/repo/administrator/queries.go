package administrator

const (
	insertAdministratorQuery = `INSERT INTO administrators(first_name, surname, last_name)
		VALUES ($1, $2, $3)`
	insertLoginFormQuery = `INSERT INTO administrators_loginform(login, password, addministrator_id) 
		VALUES ($1, $2, $3)`
	selectLoginFormQuery = `SELECT login, password, administrator_id 
		FROM administrators_loginform 
		WHERE login=$1`
	selectAdministratorQuery = `SELECT first_name, surname, last_name 
		FROM administrators 
		WHERE id=$1`
)
