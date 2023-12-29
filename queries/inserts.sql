-- Заполнение таблицы "addresses"
INSERT INTO addresses (city, street, building, entrance, floor, apartment)
VALUES
    ('City1', 'Street1', 123, 1, 2, 3),
    ('City2', 'Street2', 456, 4, 5, 6),
    ('City3', 'Street3', 789, 7, 8, 9),
    ('City4', 'Street4', 101, 10, 11, 12),
    ('City5', 'Street5', 121, 13, 14, 15),
    ('Churlmenia', 'Street1', 123, 1, 2, 3),
    ('Churlmenia', 'Street2', 456, 4, 5, 6),
    ('Churlmenia', 'Street3', 789, 7, 8, 9),
    ('Churlmenia', 'Street4', 101, 10, 11, 12),
    ('Churlmenia', 'Street5', 121, 13, 14, 15);

-- Заполнение таблицы "clients"
INSERT INTO clients (first_name, last_name, balance, address_id)
VALUES
    ('Client1_First', 'Client1_Last', 100.50, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client2_First', 'Client2_Last', 200.75, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client3_First', 'Client3_Last', 300.25, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client4_First', 'Client4_Last', 400.75, (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    ('Client5_First', 'Client5_Last', 500.25, (SELECT id FROM addresses ORDER BY random() LIMIT 1));

-- Заполнение таблицы "clients_loginform"
INSERT INTO clients_loginform (login, password, client_id)
VALUES
    ('user1', 'password1', (SELECT id FROM clients ORDER BY random() LIMIT 1)),
    ('user2', 'password2', (SELECT id FROM clients ORDER BY random() LIMIT 1)),
    ('user3', 'password3', (SELECT id FROM clients ORDER BY random() LIMIT 1)),
    ('user4', 'password4', (SELECT id FROM clients ORDER BY random() LIMIT 1)),
    ('user5', 'password5', (SELECT id FROM clients ORDER BY random() LIMIT 1));

-- Заполнение таблицы "couriers"
INSERT INTO couriers (first_name, last_name, address_id)
VALUES
    ('Courier1_First', 'Courier1_Last', (SELECT id FROM addresses WHERE city = 'Churkmenia' ORDER BY random() LIMIT 1)),
    ('Courier2_First', 'Courier2_Last', (SELECT id FROM addresses WHERE city = 'Churkmenia' ORDER BY random() LIMIT 1)),
    ('Courier3_First', 'Courier3_Last', (SELECT id FROM addresses WHERE city = 'Churkmenia' ORDER BY random() LIMIT 1)),
    ('Courier4_First', 'Courier4_Last', (SELECT id FROM addresses WHERE city = 'Churkmenia' ORDER BY random() LIMIT 1)),
    ('Courier5_First', 'Courier5_Last', (SELECT id FROM addresses WHERE city = 'Churkmenia' ORDER BY random() LIMIT 1));

-- Заполнение таблицы "couriers_loginform"
INSERT INTO couriers_loginform (login, password, courier_id)
VALUES
    ('courier1', 'courierpass1', (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    ('courier2', 'courierpass2', (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    ('courier3', 'courierpass3', (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    ('courier4', 'courierpass4', (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    ('courier5', 'courierpass5', (SELECT id FROM couriers ORDER BY random() LIMIT 1));

-- Заполнение таблицы "administrators"
INSERT INTO administrators (first_name, middle_name, last_name)
VALUES
    ('Admin1_First', 'Admin1_Sur', 'Admin1_Last'),
    ('Admin2_First', 'Admin2_Sur', 'Admin2_Last'),
    ('Admin3_First', 'Admin3_Sur', 'Admin3_Last'),
    ('Admin4_First', 'Admin4_Sur', 'Admin4_Last'),
    ('Admin5_First', 'Admin5_Sur', 'Admin5_Last');

INSERT INTO administrators_loginform (login, password, administrator_id)
VALUES
    ('admin1', 'adminpass1', (SELECT id FROM administrators ORDER BY random() LIMIT 1)),
    ('admin2', 'adminpass2', (SELECT id FROM administrators ORDER BY random() LIMIT 1)),
    ('admin3', 'adminpass3', (SELECT id FROM administrators ORDER BY random() LIMIT 1)),
    ('admin4', 'adminpass4', (SELECT id FROM administrators ORDER BY random() LIMIT 1)),
    ('admin5', 'adminpass5', (SELECT id FROM administrators ORDER BY random() LIMIT 1));

INSERT INTO administrators_passphrases (passphrase)
VALUES
    ('Славяне'),
    ('Славянка'),
    ('Славянин'),
    ('Славянёнок'),
    ('Славянята');

-- Заполнение таблицы "stores"
INSERT INTO stores (reputation, name, first_name, middle_name, last_name, address_id)
VALUES
    (4, 'Store1', 'Store1_First', 'Store1_Sur', 'Store1_Last', (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    (5, 'Store2', 'Store2_First', 'Store2_Sur', 'Store2_Last', (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    (3, 'Store3', 'Store3_First', 'Store3_Sur', 'Store3_Last', (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    (2, 'Store4', 'Store4_First', 'Store4_Sur', 'Store4_Last', (SELECT id FROM addresses ORDER BY random() LIMIT 1)),
    (1, 'Store5', 'Store5_First', 'Store5_Sur', 'Store5_Last', (SELECT id FROM addresses ORDER BY random() LIMIT 1));

INSERT INTO stores_loginform (login, password, store_id)
VALUES
    ('store1', 'storepass1', (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('store2', 'storepass2', (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('store3', 'storepass3', (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('store4', 'storepass4', (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('store5', 'storepass5', (SELECT id FROM stores ORDER BY random() LIMIT 1));

-- Заполнение таблицы "products"
INSERT INTO products (name, price, weight, description, image, quantity, store_id)
VALUES
    ('Product1', 19.99, 0.5, 'Description1', 'some_path', 4, (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('Product2', 29.99, 1.0, 'Description2', 'some_path', 4, (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('Product3', 39.99, 1.5, 'Description3', 'some_path', 4, (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('Product4', 49.99, 2.0, 'Description4', 'some_path', 4, (SELECT id FROM stores ORDER BY random() LIMIT 1)),
    ('Product5', 59.99, 2.5, 'Description5', 'some_path', 4, (SELECT id FROM stores ORDER BY random() LIMIT 1));

-- Заполнение таблицы "orders"
INSERT INTO orders (price, creation_time, delivery_time, status, client_id, courier_id)
VALUES
    (49.99, CURRENT_TIMESTAMP, NULL, 'Поиск курьера', (SELECT id FROM clients WHERE first_name = 'Client1_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (59.99, CURRENT_TIMESTAMP, NULL, 'Поиск курьера', (SELECT id FROM clients WHERE first_name = 'Client2_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (69.99, CURRENT_TIMESTAMP, NULL, 'У курьера', (SELECT id FROM clients WHERE first_name = 'Client3_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (79.99, CURRENT_TIMESTAMP, NULL, 'У курьера', (SELECT id FROM clients WHERE first_name = 'Client4_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1)),
    (89.99, CURRENT_TIMESTAMP, NULL, 'У курьера', (SELECT id FROM clients WHERE first_name = 'Client5_First'), (SELECT id FROM couriers ORDER BY random() LIMIT 1));

-- Заполнение таблицы "order_products"
INSERT INTO order_products (amount, order_id, product_id)
VALUES
    (2, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (1, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (3, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (4, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1)),
    (5, (SELECT id FROM orders ORDER BY random() LIMIT 1), (SELECT id FROM products ORDER BY random() LIMIT 1));
