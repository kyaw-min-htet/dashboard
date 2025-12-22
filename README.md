1. Project Overview
- CRM/Contact Management Backend API
- Node.js + Express + PostgreSQL
- RESTful API with JWT authentication
2. Technology Stack
- Backend: Node.js, Express.js
- Database: PostgreSQL 15
- Authentication: JWT (jsonwebtoken)
- Password Hashing: bcryptjs
- CORS: cors middleware
- Environment: dotenv
- Containerization: Docker + Docker Compose
3. API Endpoints Analysis
Admin Users (/api/admin-users)
- POST /register - User registration
- POST /login - Authentication
- POST /change-password - Password management
- GET / - List users (protected)
- GET /:id - Get user (protected)
- PUT /:id - Update user (protected)
- DELETE /:id - Delete user (owner only)
Organizations (/api/organizations)
- GET / - List all organizations
- GET /:id - Get organization by ID
- POST / - Create organization
- PUT /:id - Update organization
- DELETE /:id - Delete organization
Contacts (/api/contacts)
- GET / - List contacts (supports ?populate=true)
- GET /:id - Get contact (supports ?populate=true)
- POST / - Create contact (validates organization exists)
- PUT /:id - Update contact
- DELETE /:id - Delete contact
4. Database Schema
- organizations: id, name, email, phone, address, city, state, country, postal_code
- admin_users: id, first_name, last_name, email, password, owner
- contacts: id, first_name, last_name, organization_id, email, phone, address, city, state, country, postal_code
5. Configuration Requirements
- Environment Variables: NODE_ENV, JWT_SECRET, DATABASE_URL
- Frontend Origins: localhost:3000, 3001, 5173
- Database: PostgreSQL with automatic initialization
6. Setup Instructions
- Local Development: npm install, npm run dev
- Docker: docker-compose up -d --build
- Database: Auto-creates tables via init scripts
7. Authentication Flow
- JWT-based with 24-hour expiration
- Owner role for admin privileges
- Password requirements: min 6 characters
8. Features & Security
- CORS enabled for multiple origins
- Input validation on all routes
- Parameterized SQL queries (SQL injection protection)
- Docker health checks
- Environment-based configuration
9. Development Notes
- Uses async/await throughout
- Comprehensive error handling
- Structured with models, routes, middleware separation
- Supports data population (contacts ↔ organizations)
---
Would you like me to proceed with creating the README.md file based on this structure? The README will include:
1. Installation & Setup (with both local and Docker options)
2. API Documentation (detailed endpoint descriptions)
3. Environment Configuration
4. Database Schema
5. Authentication Guide
6. Development Guidelines
7. Docker Deployment Instructions
8. Troubleshooting Section
9. Contributing Guidelines
