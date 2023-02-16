DROP DATABASE IF EXISTS products_api;

CREATE DATABASE products_api;

\c products_api;

CREATE TABLE products (
product_id SERIAL,
name VARCHAR(100),
slogan VARCHAR(500),
description VARCHAR(1000),
category VARCHAR(50),
default_price VARCHAR(25)
);
ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
COPY products (product_id, name, slogan, description, category, default_price)
FROM '/Users/kevinle/Downloads/products-data/product.csv'
DELIMITER ','
CSV HEADER;
UPDATE products SET default_price = TO_CHAR(TO_NUMBER(default_price, '999999999999.99'), 'FM9999999990.00')

CREATE TABLE related (
id BIGSERIAL,
product_id INTEGER,
related_id INTEGER
);
ALTER TABLE related ADD CONSTRAINT related_pkey PRIMARY KEY (id);
COPY related (id, product_id, related_id)
FROM '/Users/kevinle/Downloads/products-data/related.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE features (
feature_id BIGSERIAL,
feature VARCHAR(1000),
value VARCHAR(1000),
product_id INTEGER
);
ALTER TABLE features ADD CONSTRAINT features_pkey PRIMARY KEY (feature_id);
COPY features (feature_id, product_id, feature, value)
FROM '/Users/kevinle/Downloads/products-data/features.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE styles (
style_id BIGSERIAL,
name VARCHAR(255),
original_price VARCHAR(50),
sale_price VARCHAR(50),
default_style BOOLEAN,
product_id INTEGER
);
ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (style_id);
COPY styles (style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/kevinle/Downloads/products-data/styles.csv'
WITH (FORMAT csv, HEADER true, NULL 'null');
-- DELIMITER ','
-- CSV HEADER;

CREATE TABLE photos (
photo_id BIGSERIAL,
thumbnail_url TEXT,
url TEXT,
style_id INTEGER
);
ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);
COPY photos (photo_id, style_id, url, thumbnail_url)
FROM '/Users/kevinle/Downloads/products-data/photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE skus (
sku_id BIGSERIAL,
quantity INTEGER,
size VARCHAR(25),
style_id INTEGER
);
ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (sku_id);
COPY skus (sku_id, style_id, size, quantity)
FROM '/Users/kevinle/Downloads/products-data/skus.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE cart (
cart_id BIGSERIAL,
count INTEGER,
sku_id INTEGER
);
ALTER TABLE cart ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);

-- add foreign keys
ALTER TABLE related ADD CONSTRAINT related_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE related ADD CONSTRAINT related_related_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(style_id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(style_id);
ALTER TABLE cart ADD CONSTRAINT cart_sku_id_fkey FOREIGN KEY (sku_id) REFERENCES skus(sku_id);