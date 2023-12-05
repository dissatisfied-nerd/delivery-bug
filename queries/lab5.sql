INSERT INTO stores (reputation, name) VALUES (0.8, 'test1');
INSERT INTO stores (reputation, name) VALUES (0.7, 'test2');
INSERT INTO stores (reputation, name) VALUES (0.6, 'test3');
INSERT INTO stores (reputation, name) VALUES (0.5, 'test4');

SELECT *
FROM stores;

DELETE FROM stores
WHERE name='test1';

DELETE FROM stores
WHERE reputation <= 0.5;

-- DELETE FROM stores

UPDATE stores
SET reputation = 1
WHERE name='test4';


INSERT INTO couriers (first_name, last_name, registration) VALUES ('A0', 'B0', false) returning id;
-- 6cbd87be-9dee-4a6a-be30-bd6cc0fd777d
INSERT INTO couriers (first_name, last_name, registration) VALUES ('A1', 'B1', false);
INSERT INTO couriers (first_name, last_name, registration) VALUES ('A2', 'B2', false);
INSERT INTO couriers (first_name, last_name, registration) VALUES ('A3', 'B3', false);

INSERT INTO clients (first_name, last_name) VALUES('A1', 'B1') returning id;
-- de57c359-909e-4ad1-ae68-89a1cf2e3fba
INSERT INTO clients (first_name, last_name) VALUES('A2', 'B2') returning id;
-- 8616ce59-2e63-4a2f-898a-edaeebd2b7c9
INSERT INTO clients (first_name, last_name) VALUES('A4', 'B4') returning id;

SELECT first_name, last_name
FROM couriers
UNION
SELECT first_name, last_name
FROM clients;


SELECT first_name, last_name
FROM couriers
UNION ALL
SELECT first_name, last_name
FROM clients;

SELECT first_name, last_name
FROM couriers
UNION ALL
SELECT first_name, last_name
FROM clients
ORDER BY first_name;


INSERT into addresses(city) values ('Москва') RETURNING id;
INSERT into addresses(city) values ('Воронеж') RETURNING id;

-- a1615d9e-b485-4c26-ae2d-0cbd418be755
-- f4df2337-a2ad-42aa-b9be-412ab234032c



INSERT INTO orders (price, creation_time, delivery_time, client_id, courier_id, address_id)
VALUES (120,
        '2023-01-01',
        '2023-05-01',
        'de57c359-909e-4ad1-ae68-89a1cf2e3fba',
        '6cbd87be-9dee-4a6a-be30-bd6cc0fd777d',
        'f4df2337-a2ad-42aa-b9be-412ab234032c'
) returning id;

INSERT INTO orders (price, creation_time, delivery_time, client_id, courier_id, address_id)
VALUES (120,
        '2023-01-01',
        '2023-01-25',
        'de57c359-909e-4ad1-ae68-89a1cf2e3fba',
        '6cbd87be-9dee-4a6a-be30-bd6cc0fd777d',
        'a1615d9e-b485-4c26-ae2d-0cbd418be755'
) returning id;

SELECT distinct client_id AS cl
FROM orders
WHERE (SELECT COUNT(DISTINCT address_id)
       FROM orders
       WHERE client_id = orders.client_id and delivery_time < '2023-04-01') = 1;

---
INSERT INTO products (name) VALUES ('test1') returning id;
-- 9a9d0a60-f650-4e5b-8473-bbac1ca42aec
INSERT INTO products (name) VALUES ('test2') returning id;
-- b0ffb990-867a-48f9-81e3-7298358d2989

-- ac6d27ed-361b-430b-88a9-c442a4fad519 order_id

insert into order_products (amount, order_id, product_id) values (2, '753ea90d-c063-4f96-ad00-b4b08bd56f19',
                                                                 '9a9d0a60-f650-4e5b-8473-bbac1ca42aec');


insert into order_products (amount, order_id, product_id)
values (2, '753ea90d-c063-4f96-ad00-b4b08bd56f19', 'b0ffb990-867a-48f9-81e3-7298358d2989');

SELECT sum(amount), product_id
from order_products
group by product_id
order by sum(amount)
limit 5