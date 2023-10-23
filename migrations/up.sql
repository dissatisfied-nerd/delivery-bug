CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS clients
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name varchar(128),
    last_name  varchar(128),
    balance    float
);

CREATE TABLE IF NOT EXISTS addresses
(
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city      varchar(128),
    street    varchar(128),
    building  int,
    entrance  int,
    floor     int,
    apartment int,

    client_id UUID REFERENCES clients (id)
);

CREATE TABLE IF NOT EXISTS couriers
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name varchar(128),
    last_name  varchar(128),
    propiska   boolean
);

CREATE TABLE IF NOT EXISTS stores
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reputation float,
    name       varchar(128)
);

CREATE TABLE IF NOT EXISTS tags
(
    id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tag varchar(128)
);

CREATE TABLE IF NOT EXISTS products
(
    id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name             varchar(128),
    price            float CHECK (price > 0),
    weight           float,
    description      varchar(512),
    image            bytea
);

CREATE TABLE IF NOT EXISTS products_stores
(
    product_id UUID REFERENCES products (id),
    store_id UUID REFERENCES stores (id),
    PRIMARY KEY (product_id, store_id)
);

CREATE TABLE IF NOT EXISTS products_tags
(
    product_id  UUID REFERENCES products (id),
    tag_id UUID REFERENCES tags (id),
    PRIMARY KEY (product_id, tag_id)
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
    product_id UUID REFERENCES products (id),
    mark      int
);

