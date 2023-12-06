-- Заполнение таблицы "addresses"
INSERT INTO addresses (city, street, building, entrance, floor, apartment)
VALUES
    ('City1', 'Street1', 123, 1, 2, 3),
    ('City2', 'Street2', 456, 4, 5, 6),
    ('City3', 'Street3', 789, 7, 8, 9),
    ('City4', 'Street4', 101, 10, 11, 12),
    ('City5', 'Street5', 121, 13, 14, 15);

-- Заполнение таблицы "clients"
INSERT INTO clients (first_name, last_name, balance, address_id)
VALUES
    ('Client1_First', 'Client1_Last', 100.50, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client2_First', 'Client2_Last', 200.75, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client3_First', 'Client3_Last', 300.25, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client4_First', 'Client4_Last', 400.75, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client5_First', 'Client5_Last', 500.25, (SELECT id FROM addresses ORDER BY random() LIMIT 1));


-- Заполнение таблицы "loginForm"
INSERT INTO loginForm (login, password, client_id)
VALUES
    ('user1', 'password1', (SELECT id FROM clients WHERE first_name = 'Client1_First')),
    ('user2', 'password2', (SELECT id FROM clients WHERE first_name = 'Client2_First')),
    ('user3', 'password3', (SELECT id FROM clients WHERE first_name = 'Client3_First')),
    ('user4', 'password4', (SELECT id FROM clients WHERE first_name = 'Client4_First')),
    ('user5', 'password5', (SELECT id FROM clients WHERE first_name = 'Client5_First'));

-- Заполнение таблицы "couriers"
INSERT INTO couriers (first_name, last_name, registration)
VALUES
    ('Courier1_First', 'Courier1_Last', 'Country1'),
    ('Courier2_First', 'Courier2_Last', 'Country2'),
    ('Courier3_First', 'Courier3_Last', 'Country3'),
    ('Courier4_First', 'Courier4_Last', 'Country4'),
    ('Courier5_First', 'Courier5_Last', 'Country5');

-- Заполнение таблицы "administrators"
INSERT INTO administrators (first_name, last_name)
VALUES
    ('Admin1_First', 'Admin1_Last'),
    ('Admin2_First', 'Admin2_Last'),
    ('Admin3_First', 'Admin3_Last'),
    ('Admin4_First', 'Admin4_Last'),
    ('Admin5_First', 'Admin5_Last');

-- Заполнение таблицы "stores"
INSERT INTO stores (reputation, name)
VALUES
    (4, 'Store1'),
    (5, 'Store2'),
    (3, 'Store3'),
    (2, 'Store4'),
    (1, 'Store5');

-- Заполнение таблицы "products"
INSERT INTO products (name, price, weight, description, image)
VALUES
    ('Product1', 19.99, 0.5, 'Description1', NULL),
    ('Product2', 29.99, 1.0, 'Description2', NULL),
    ('Product3', 39.99, 1.5, 'Description3', NULL),
    ('Product4', 49.99, 2.0, 'Description4', NULL),
    ('Product5', 59.99, 2.5, 'Description5', NULL);

-- Заполнение таблицы "orders"
INSERT INTO orders (price, creation_time, delivery_time, client_id, courier_id)
VALUES
    (49.99, CURRENT_TIMESTAMP, NULL, (SELECT id FROM clients WHERE first_name = 'Client1_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (59.99, CURRENT_TIMESTAMP, NULL, (SELECT id FROM clients WHERE first_name = 'Client2_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (69.99, CURRENT_TIMESTAMP, NULL, (SELECT id FROM clients WHERE first_name = 'Client3_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (79.99, CURRENT_TIMESTAMP, NULL, (SELECT id FROM clients WHERE first_name = 'Client4_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (89.99, CURRENT_TIMESTAMP, NULL, (SELECT id FROM clients WHERE first_name = 'Client5_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1));

-- Заполнение таблицы "order_products"
INSERT INTO order_products (amount, order_id, product_id)
VALUES
    (2, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (1, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (3, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (4, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (5, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1));

-- Заполнение таблицы "reviews"
INSERT INTO reviews (mark, client_id, order_id, product_id)
VALUES
    (5, (SELECT id FROM clients WHERE first_name = 'Client1_First'), (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (4, (SELECT id FROM clients WHERE first_name = 'Client2_First'), (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (3, (SELECT id FROM clients WHERE first_name = 'Client3_First'), (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (2, (SELECT id FROM clients WHERE first_name = 'Client4_First'), (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (1, (SELECT id FROM clients WHERE first_name = 'Client5_First'), (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1));
