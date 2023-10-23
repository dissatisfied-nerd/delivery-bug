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



