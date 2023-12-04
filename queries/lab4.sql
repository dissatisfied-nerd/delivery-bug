SELECT * FROM clients;

SELECT * FROM addresses;

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
