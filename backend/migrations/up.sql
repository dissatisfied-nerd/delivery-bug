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

CREATE TABLE IF NOT EXISTS clients_loginform
(
    login     varchar(128) PRIMARY KEY,

    password  varchar(128),

    client_id UUID REFERENCES clients (id)
);

CREATE TABLE IF NOT EXISTS couriers
(
    id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    first_name   varchar(128),
    last_name    varchar(128),
    
    address_id   UUID REFERENCES addresses (id)
);

CREATE TABLE IF NOT EXISTS couriers_loginform
(
    login      varchar(128) PRIMARY KEY,

    password   varchar(128),

    courier_id UUID REFERENCES couriers (id)
);

CREATE TABLE IF NOT EXISTS administrators
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    first_name varchar(128),
    surname    varchar(128),
    last_name  varchar(128)
);

CREATE TABLE IF NOT EXISTS administrators_loginform
(
    login    varchar(128) PRIMARY KEY,

    password varchar(128),

    administrator_id UUID REFERENCES administrators (id)
);

CREATE TABLE IF NOT EXISTS administrators_passphrases
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    passphrase varchar(128) -- Кодовое слово для регистрации администратора
);

CREATE TABLE IF NOT EXISTS stores
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    reputation int,                      -- Считается как-нибудь
    name       varchar(128),             -- Имя магазина
    first_name varchar(128),             -- Данные юрлица-представителя
    surname    varchar(128),
    last_name  varchar(128),

    address_id UUID REFERENCES addresses (id) -- Юридический адрес
);

CREATE TABLE IF NOT EXISTS stores_loginform
(
    login    varchar(128) PRIMARY KEY,

    password varchar(128),

    store_id UUID REFERENCES stores (id)
);

CREATE TABLE IF NOT EXISTS products
(
    id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    name             varchar(128),
    price            float CHECK (price > 0),
    weight           float,
    description      varchar(512),
    image            varchar(255),

    administrator_id UUID REFERENCES administrators (id), -- Одобривший товар администратор
    store_id UUID REFERENCES stores (id)
);

CREATE TABLE IF NOT EXISTS orders
(
    id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    price         float,
    creation_time timestamp,
    delivery_time timestamp,
    status        varchar(255),
    client_id     UUID REFERENCES clients (id),
    courier_id    UUID REFERENCES couriers (id)
);

CREATE TABLE IF NOT EXISTS order_products
(
    amount     int,

    order_id   UUID REFERENCES orders (id),
    product_id UUID REFERENCES products (id),
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE IF NOT EXISTS reviews
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    mark       int,

    client_id  UUID REFERENCES clients (id),
    order_id   UUID REFERENCES orders (id),
    product_id UUID REFERENCES products (id)
);
