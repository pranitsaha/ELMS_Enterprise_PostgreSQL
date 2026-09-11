# ELMS Project
Default Ports
Service	PortFrontend	3000
Backend	5000
PostgreSQL	5432


Backend Start:

    cd server
    npm init -y
    npm install express pg dotenv cors bcryptjs jsonwebtoken
    npm install nodemon --save-dev
    npm install pg
    node server.js(Server running on port 5000)

Frontend Start:

    cd client
    npx create-react-app .
    npm install axios react-router-dom bootstrap
    npm start

    Local:            http://localhost:3000


Database settings in .env:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=yourpassword
    DB_NAME=leave_management
    JWT_SECRET=mysecret


Database:
  
  CREATE DATEBASE IN POSTGRESQL

    CREATE DATABASE leave_management;


  CREATE TABLE UNDER leave_management TABLE IN POSTGRESQL

  CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    department VARCHAR(100),
    role VARCHAR(20),
    leave_balance INT DEFAULT 20
  );

  CREATE TABLE leaves (
    id SERIAL PRIMARY KEY,
    employee_id INT,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(employee_id)
    REFERENCES employees(id)
  );

  CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    total_days INT,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee
    FOREIGN KEY (employee_id)
    REFERENCES employees(id)
  );

  CREATE TABLE leave_audit (
    id SERIAL PRIMARY KEY,
    leave_request_id INT,
    admin_id INT,
    action VARCHAR(20),
    remarks TEXT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (leave_request_id)
    REFERENCES leave_requests(id),

    FOREIGN KEY (admin_id)
    REFERENCES employees(id)
  );

  CREATE TABLE leave_requests (

    id SERIAL PRIMARY KEY,
    employee_id INT,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    total_days INT,
    reason TEXT,
    status VARCHAR(20)
    DEFAULT 'Pending',

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(employee_id)
    REFERENCES employees(id)
  );