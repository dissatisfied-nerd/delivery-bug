package order

const (
	getOrdersByUserID = `
	SELECT id, price, status, creation_time, delivery_time, client_id, courier_id
	FROM orders
	WHERE client_id = $1
	`

	getOrdersByCourierSID = `
	SELECT id, price, status, creation_time, delivery_time, client_id, courier_id
	FROM orders
	WHERE courier_id = $1
	`

	getOrderProducts = `
	SELECT amount, order_id, product_id
	FROM order_products
	WHERE order_id = $1
	`

	createOrder = `
	INSERT INTO orders(price, creation_time, client_id, status) VALUES($1, $2, $3, $4) RETURNING id
	`

	createOrderProducts = `
	INSERT INTO order_products(amount, order_id, product_id) VALUES ($1, $2, $3)
	`

	selectFreeOrdersQuery = `SELECT id, price, status, creation_time, delivery_time, client_id FROM orders
		WHERE status=$1`
)
