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
	INSERT INTO orders(price, creation_time, client_id, status) 
	VALUES($1, $2, $3, $4) RETURNING id
	`
	createOrderProducts = `
	INSERT INTO order_products(amount, order_id, product_id) 
	VALUES ($1, $2, $3)
	`
	selectFreeOrdersQuery = `
	SELECT id, price, status, creation_time, delivery_time, client_id 
	FROM orders
	WHERE status=$1
	`
	setOrderTakenQuery = `
	UPDATE orders 
	SET status=$1, courier_id=$2 
	WHERE id=$3
	`
	setOrderFinishedQuery = `
	UPDATE orders 
	SET status=$1, delivery_time=$2
	WHERE courier_id=$3 and id=$4
	`
	selectOrderById = `
	SELECT id, price, status, creation_time, delivery_time, client_id, courier_id 
	FROM orders 
	WHERE id=$1
	`
	selectOrderProducts = `
	SELECT amount, product_id 
	FROM order_products 
	WHERE order_id=$1
	`
	selectProductNameQuantity = `
	SELECT name, quantity
	FROM products
	WHERE id=$1
	`
	decreaseProductQuantity = `
	UPDATE products
	SET quantity=quantity-$1
	WHERE id=$2
	`
)
