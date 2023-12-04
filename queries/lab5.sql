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


INSERT INTO couriers (first_name, last_name, registration) VALUES ('A0', 'B0', false);
INSERT INTO couriers (first_name, last_name, registration) VALUES ('A1', 'B1', false);
INSERT INTO couriers (first_name, last_name, registration) VALUES ('A2', 'B2', false);
INSERT INTO couriers (first_name, last_name, registration) VALUES ('A3', 'B3', false);

INSERT INTO clients (first_name, last_name) VALUES('A1', 'B1');
INSERT INTO clients (first_name, last_name) VALUES('A2', 'B2');
INSERT INTO clients (first_name, last_name) VALUES('A4', 'B4');

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
ORDER BY first_name


SELECT