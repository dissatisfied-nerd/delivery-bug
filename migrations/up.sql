CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS addresses
(
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city      varchar(128),
    street    varchar(128),
    building  int,
    entrance  int,
    floor     int,
    apartment int
);

CREATE TABLE IF NOT EXISTS clients
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name varchar(128),
    last_name  varchar(128),
    balance    float,
    address_id UUID REFERENCES addresses (id)
);

CREATE TABLE IF NOT EXISTS couriers
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name varchar(128),
    last_name  varchar(128),
    propiska   boolean
);

CREATE TABLE IF NOT EXISTS administrators
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name varchar(128),
    last_name  varchar(128)
);

CREATE TABLE IF NOT EXISTS stores
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reputation float,
    name       varchar(128)
);

CREATE TABLE IF NOT EXISTS categories
(
    id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category varchar(128)
);

CREATE TABLE IF NOT EXISTS products
(
    id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name             varchar(128),
    price            float CHECK (price > 0),
    weight           float,
    description      varchar(512),
    image            bytea,
    store_id         UUID REFERENCES stores (id),
    administrator_id UUID REFERENCES administrators (id)
);

CREATE TABLE IF NOT EXISTS products_categories
(
    product_id  UUID REFERENCES products (id),
    category_id UUID REFERENCES categories (id),
    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE IF NOT EXISTS orders
(
    id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name          varchar(128),
    creation_time timestamp,
    delivery_time timestamp,
    client_id     UUID REFERENCES clients (id),
    courier_id    UUID REFERENCES couriers (id),
    product_id    UUID REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS reviews
(
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_id UUID REFERENCES clients (id),
    order_id  UUID REFERENCES orders (id),
    mark      int
);
