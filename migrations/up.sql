CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS stores
(
    id   UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(100)
    );

CREATE TABLE IF NOT EXISTS couriers
(
    id   UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(100)
    );

CREATE TABLE IF NOT EXISTS clients
(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(100)

    );

CREATE TABLE IF NOT EXISTS orders
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name       varchar(100),
    courier_id UUID REFERENCES couriers (id),
    client_id UUID REFERENCES clients(id)
    );

CREATE TABLE IF NOT EXISTS products
(
    id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name     varchar(100),
    price    int,
    weight   float,
    order_id UUID REFERENCES orders (id)
);

CREATE TABLE IF NOT EXISTS products_stores
(
    product_id UUID REFERENCES products(id),
    store_id UUID REFERENCES stores(id),
    PRIMARY KEY (product_id, store_id)
)
