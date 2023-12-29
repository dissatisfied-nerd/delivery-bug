package product

const (
	selectProductsQuery = `
		SELECT id, name, price, weight, description, image, quantity, store_id
		FROM products
	`
	selectProductByID = `
		SELECT id, name, price, weight, description, image, quantity, store_id
		FROM products
		WHERE id=$1
	`
	insertProductQuery = `
		INSERT INTO products(name, price, weight, description, image, quantity, store_id) 
		VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
	`
	selectProductsByStore = `
		SELECT id, name, price, weight, description, image, quantity
		FROM products 
		WHERE store_id=$1
	`
	selectStoreNameById = `
		SELECT name
		FROM stores
		WHERE id=$1	
	`
	selectOrderByProduct = `
		SELECT order_id
		FROM order_products
		WHERE product_id=$1
	`
	deleteProductById = `
		DELETE FROM products
		WHERE id=$1
	`
	deleteOrderById = `
		DELETE FROM orders
		WHERE id=$1
	`
)
