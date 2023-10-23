SELECT * FROM products;

SELECT * FROM products 
WHERE price < 1000;

SELECT price FROM products
GROUP BY price;

SELECT SUM(weight) FROM products
WHERE price > 100
GROUP BY weight;

SELECT price, COUNT(id) FROM products
GROUP BY price
HAVING COUNT(id) > 2;

SELECT * from products
ORDER BY price;

