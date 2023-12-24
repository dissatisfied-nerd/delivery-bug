package product

const (
	getProductsQuery = `SELECT id, name, price, weight, description, image 
		FROM products`

	getProductByID = `SELECT id, name, price, weight, description, image 
		FROM products
		WHERE id=$1
	`

	insertProductQuery = `INSERT INTO products(name, price, weight, description, image, store_id) 
		VALUES ($1, $2, $3, $4, $5, $6)RETURNING id`

	selectProductsByStore = `SELECT id, name, price, weight, description, image 
		FROM products 
		WHERE store_id=$1`

	deleteProductById = `DELETE FROM products
		WHERE id=$1`
)
