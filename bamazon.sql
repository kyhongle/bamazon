CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 4),
    stock_quantity INT(4),
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("old jeans", "clothing", 30.00, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("face cleanser", "beauty", 24.99, 46);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("sofa", "furniture", 150.00, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("4k tv", "electronics", 499.99, 65);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("cardigan", "clothing", 20.00, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("used laptop", "electronics", 250.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("mahogany table", "furniture", 90.00, 130);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("stockings", "clothing", 5.00, 400);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("eye cream", "beauty", 40.00, 90);