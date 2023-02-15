DROP DATABASE IF EXISTS products_api;

CREATE DATABASE products_api;

\c products_api;

CREATE TABLE products (
product_id BIGSERIAL,
name VARCHAR(100),
slogan VARCHAR(500),
description VARCHAR(1000),
category VARCHAR(50),
default_price INTEGER
);

COPY products (product_id, name, slogan, description, category, default_price)
FROM '/Users/kevinle/Downloads/products-data/product.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);

CREATE TABLE related (
id BIGSERIAL,
product_id INTEGER,
related_id INTEGER
);
ALTER TABLE related ADD CONSTRAINT related_pkey PRIMARY KEY (id);

CREATE TABLE features (
feature_id BIGSERIAL,
feature VARCHAR(1000),
value VARCHAR(1000),
product_id INTEGER
);

ALTER TABLE features ADD CONSTRAINT features_pkey PRIMARY KEY (feature_id);


CREATE TABLE styles (
style_id BIGSERIAL,
name VARCHAR(255),
original_price INTEGER,
sale_price INTEGER,
default_style BOOLEAN,
product_id INTEGER
);
ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (style_id);

CREATE TABLE photos (
photo_id BIGSERIAL,
thumbnail_url VARCHAR(1000),
url VARCHAR(1000),
style_id INTEGER
);
ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);

CREATE TABLE skus (
sku_id BIGSERIAL,
quantity INTEGER,
size VARCHAR(25),
style_id INTEGER
);
ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (sku_id);

CREATE TABLE cart (
cart_id BIGSERIAL,
count INTEGER,
sku_id INTEGER
);
ALTER TABLE cart ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);

-- add foreign keys
ALTER TABLE related ADD CONSTRAINT related_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE related ADD CONSTRAINT related_related_id_fkey FOREIGN KEY (related_id) REFERENCES products(product_id);
ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(style_id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(style_id);
ALTER TABLE cart ADD CONSTRAINT cart_sku_id_fkey FOREIGN KEY (sku_id) REFERENCES skus(sku_id);