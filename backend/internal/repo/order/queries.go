package order

const (
	getOrders = `
	SELECT id, price, creation_time, delivery_time, client_id, courier_id
	FROM orders
	`

	getOrderProducts = `
	SELECT amount, order_id, product_id
	FROM order_products
	WHERE order_id = $1
	`

	createOrder = `
	INSERT INTO orders(price, creation_time, client_id) VALUES($1, $2, $3) RETURNING id
	`

	createOrderProducts = `
	INSERT INTO order_products(amount, order_id, product_id) VALUES ($1, $2, $3)
	`
)
