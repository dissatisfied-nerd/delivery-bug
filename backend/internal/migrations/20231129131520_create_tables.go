package migrations

import (
	"database/sql"
	"github.com/pressly/goose"
)

func init() {
	goose.AddMigration(upCreateTables, downCreateTables)
}

func upCreateTables(tx *sql.Tx) error {
	_, err := tx.Exec(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS addresses
(
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city      varchar(128),
    street    varchar(128),
    building  int,
    entrance  int,
    floor     int,
    apartment int
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS clients
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    first_name varchar(128),
    last_name  varchar(128),
    balance    float,

    address_id UUID REFERENCES addresses (id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS clients_loginForm
(
    login varchar(128) PRIMARY KEY,

    password varchar(128),

    client_id UUID REFERENCES clients (id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS couriers
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    first_name varchar(128),
    last_name  varchar(128),
    registration  bool NOT NULL, -- Страна регистрации
    address_id UUID REFERENCES addresses (id)
);
`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS couriers_loginform
(
    login varchar(128) PRIMARY KEY,

    password varchar(128),

    courier_id UUID REFERENCES couriers (id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS administrators
(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    first_name varchar(128),
    last_name varchar(128)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS stores
(
    id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    reputation int, -- Устанавливается администратором
    name       varchar(128),

    administrator_id UUID REFERENCES administrators(id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS tags
(
    id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    tag varchar(128)
);
`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS products
(
    id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    name             varchar(128),
    price            float CHECK (price > 0),
    weight           float,
    description      varchar(512),
    image            bytea
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS products_stores
(
    product_id UUID REFERENCES products (id),
    store_id UUID REFERENCES stores (id),
    PRIMARY KEY (product_id, store_id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS products_tags
(
    product_id  UUID REFERENCES products (id),
    tag_id UUID REFERENCES tags (id),
    PRIMARY KEY (product_id, tag_id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS orders
(
    id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    price float, 
    creation_time timestamp,
    delivery_time timestamp,

    client_id     UUID REFERENCES clients (id),
    courier_id    UUID REFERENCES couriers (id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS order_products
(
    amount int,

    order_id  UUID REFERENCES orders (id),
    product_id UUID REFERENCES products (id),
    PRIMARY KEY (order_id, product_id)
);`)
	if err != nil {
		return err
	}

	_, err = tx.Exec(`CREATE TABLE IF NOT EXISTS reviews
(
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    mark int,

    client_id UUID REFERENCES clients (id),
    order_id  UUID REFERENCES orders (id),
    product_id UUID REFERENCES products (id)
)`)
	if err != nil {
		return err
	}

	return nil
}

func downCreateTables(tx *sql.Tx) error {
	_, err := tx.Exec(`drop table order_products`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table reviews cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table orders cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table products_stores;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table products_tags cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table products cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table tags cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table stores cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table administrators cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table couriers cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table clients_loginform cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table couriers_loginform cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table clients cascade;`)
	if err != nil {
		return err
	}
	_, err = tx.Exec(`drop table addresses cascade`)
	if err != nil {
		return err
	}

	return nil
}
