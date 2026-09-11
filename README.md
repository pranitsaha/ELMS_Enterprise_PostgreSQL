# ELMS Project
Full project blueprint with frontend/backend structure and run guide.


Why PostgreSQL?

For your project presentation, write:

PostgreSQL was selected because it provides strong relational data management, ACID compliance, robust security, and efficient handling of employee-leave relationships. The Employee Leave Management System requires structured data with foreign key constraints, making PostgreSQL a suitable choice over NoSQL databases.


Registration API

Endpoint:
POST /api/auth/register

Purpose:
Allows new employees to register into the Leave Management System.

Features:
- Validates user input
- Checks duplicate email
- Encrypts password using bcrypt
- Stores employee details in PostgreSQL
- Creates employee with default leave balance of 20 days

GitHub Copilot Usage:
Used GitHub Copilot to generate Express route handlers,
bcrypt password hashing logic, PostgreSQL queries,
and API response structures.



Login & JWT Authentication

Endpoint:
POST /api/auth/login

Purpose:
Authenticates employees and administrators.

Features:
- Validates email and password
- Compares encrypted passwords using bcrypt
- Generates JWT token
- Supports role-based access control
- Protects private API endpoints

JWT Payload:
{
  id,
  email,
  role
}

GitHub Copilot Usage:
Used GitHub Copilot to generate login controller logic,
JWT authentication middleware,
password verification using bcrypt,
and frontend login page components.



Employee Dashboard

Purpose:
Provides a summary of the employee's leave information.

Features:
- Total Leave Allocation
- Used Leave Count
- Available Leave Balance
- Pending Leave Requests

API Endpoint:
GET /api/dashboard

Security:
Protected using JWT Authentication.

Technologies:
- React JS
- Express JS
- PostgreSQL
- Bootstrap

GitHub Copilot Usage:
GitHub Copilot assisted in generating
dashboard API logic,
PostgreSQL queries,
React functional components,
Axios integration,
and Bootstrap dashboard layouts.



Admin Leave Approval Module

Purpose:
Allows administrators to review and manage leave requests.

Backend APIs:
GET /api/admin/leaves
PUT /api/admin/approve/:id
PUT /api/admin/reject/:id

Features:
- View all leave requests
- Approve leave
- Reject leave
- Role-based access control
- Admin-only dashboard functionality

Frontend:
- Admin Approval Dashboard
- Leave Request Table
- Approve Button
- Reject Button

Security:
JWT Authentication
Admin Role Validation

GitHub Copilot Usage:
Used Copilot to generate PostgreSQL queries,
role-based middleware,
React approval dashboards,
and leave approval APIs.




Reports Module

Purpose:
Provides administrative insights into employee leave activity.

Features:
- Total Employee Count
- Total Leave Requests
- Approved Requests
- Rejected Requests
- Pending Requests

API:
GET /api/reports

Access:
Admin Only

Frontend:
Interactive report dashboard with summary cards.

Technologies:
React, Express, PostgreSQL, JWT Authentication

GitHub Copilot Usage:
Used GitHub Copilot to generate PostgreSQL aggregation queries,
admin-only APIs, React report components, and dashboard analytics UI.




GitHub Copilot was used to generate:
- React table component
- Axios API integration
- Leave history controller
- PostgreSQL queries
- Status badge UI rendering