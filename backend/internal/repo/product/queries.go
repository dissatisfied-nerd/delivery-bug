package product

const (
	getProductsQuery = `SELECT id, name, price, weight, description, image FROM products`

	getProductByID = `
	SELECT id, name, price, weight, description, image FROM products
	WHERE id=$1
	`
)
