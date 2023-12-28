package admin

const (
	insertAdminQuery = `
		INSERT INTO administrators(first_name, middle_name, last_name)
		VALUES ($1, $2, $3) RETURNING id
	`
	insertLoginFormQuery = `
		INSERT INTO administrators_loginform(login, password, administrator_id) 
		VALUES ($1, $2, $3)
	`
	selectLoginFormQuery = `
		SELECT login, password, administrator_id 
		FROM administrators_loginform 
		WHERE login=$1
	`
	selectAdminQuery = `
		SELECT first_name, middle_name, last_name 
		FROM administrators 
		WHERE id=$1
	`
	selectPassPhraseQuery = `
		SELECT id 
		FROM administrators_passphrases
		WHERE passphrase=$1
	`
)
