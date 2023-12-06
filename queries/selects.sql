SELECT * FROM products;

SELECT * FROM products 
WHERE price < 7;

SELECT name, sum(price) as summary_price FROM products
GROUP BY name;

SELECT name, SUM(weight) as summary_weight FROM products
WHERE price > 7
GROUP BY name;

SELECT MAX(price) FROM products;

SELECT MIN(price) FROM products;

SELECT AVG(price) from products
WHERE price > 5;

SELECT price, COUNT(id) FROM products
GROUP BY price
HAVING COUNT(id) > 2;

SELECT * from products
ORDER BY price;

SELECT name, price FROM products
WHERE price < ANY
    (SELECT weight 
    FROM products
    WHERE weight > 5);

SELECT name, weight FROM products
WHERE weight < ALL
    (SELECT weight 
    FROM products
    WHERE weight > 7);

-- Адресы с одинаковыми улицами
SELECT a.id as id1, b.id as id2, a.city, a.street
FROM addresses as a, addresses as b
WHERE a.street = b.street 
    AND a.id > b.id;

-- Клиенты с номером дома в адресе больше 50
SELECT *
FROM clients
WHERE address_id IN (SELECT id FROM addresses WHERE building>50);

-- Клиенты с балансом больше 4000, живущие на улице сталина
SELECT *
FROM clients
WHERE balance > 4000
    AND address_id IN (SELECT id FROM addresses WHERE street = '"ул. Сталина"');

-- Клиенты с меньшим балансом, чем средний баланс
SELECT *
FROM clients
WHERE balance < (SELECT AVG(balance) FROM clients);

-- Клиенты, у которых баланс больше баланса любого клиента из Москвы
SELECT *
FROM clients
WHERE balance > ANY (SELECT balance FROM clients WHERE address_id IN (SELECT id FROM addresses WHERE city = '"Москва"'));

-- Клиенты, у которых баланс меньше среднего при условии множественности таких клиентов.
SELECT *
FROM clients c1
WHERE balance < (SELECT AVG(balance) FROM clients)
    AND EXISTS (SELECT 1 FROM clients c2 WHERE c2.balance < (SELECT AVG(balance) FROM clients) AND c2.id <> c1.id);

-- 2 Клиента с наибольшей суммой стоимостей заказов
SELECT c.id AS client_id, c.first_name, c.last_name, SUM(o.price) AS total_order_amount
FROM clients c
JOIN orders o ON c.id = o.client_id
GROUP BY c.id, c.first_name, c.last_name
ORDER BY total_order_amount DESC
LIMIT 2;

