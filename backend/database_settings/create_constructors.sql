-- SQL script to create the 'constructors' table
CREATE TABLE IF NOT EXISTS constructors (
    id SERIAL PRIMARY KEY,
    contractor_name VARCHAR(255) UNIQUE NOT NULL,
    national_id VARCHAR(255) UNIQUE NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);