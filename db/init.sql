-- Create the necessary database schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Switch to the auth schema
SET search_path TO auth;

-- Create a table to store user information
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Create a table to store role permissions
CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) UNIQUE NOT NULL
);

-- Create a table to store permissions
CREATE TABLE IF NOT EXISTS permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create a table to map roles to permissions
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT REFERENCES roles(role_id),
    permission_id INT REFERENCES permissions(permission_id),
    PRIMARY KEY (role_id, permission_id)
);

-- Insert initial roles
INSERT INTO roles (role_name) VALUES
    ('admin'),
    ('moderator'),
    ('user');

-- Insert initial permissions
INSERT INTO permissions (permission_name) VALUES
    ('read_product'),
    ('create_product'),
    ('update_product'),
    ('delete_product');

-- Map roles to permissions
INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (1, 1), -- admin can read products
    (1, 2), -- admin can create products
    (1, 3), -- admin can update products
    (1, 4); -- admin can delete products

-- Insert an example user with role 'admin'
INSERT INTO users (username, password, role)
VALUES ('admin', 'hashed_password', 'admin');

-- Commit the transaction
COMMIT;


-- Add a table to store billing information
CREATE TABLE IF NOT EXISTS billing_info (
    billing_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    card_number VARCHAR(16) NOT NULL,
    expiration_date DATE NOT NULL,
    billing_address TEXT NOT NULL
);

-- Insert initial billing information for the example user
INSERT INTO billing_info (user_id, card_number, expiration_date, billing_address)
VALUES (1, '1234567812345678', '2025-12-31', '1234 Elm St, Nairobi, Kenya');

-- Commit the transaction
COMMIT;