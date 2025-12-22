CRM Dashboard Frontend
📋 Project Overview
A modern CRM dashboard application built with React 18, TypeScript, and Vite. Features complete CRUD operations for users, contacts, and organizations with responsive design and real-time filtering.
🚀 Features
- Authentication System with JWT tokens
- User Management with role-based access
- Contact Management with organization associations
- Organization Management with full CRUD operations
- Real-time Filtering across all data tables
- Responsive Design optimized for mobile and desktop
- Modern UI with Tailwind CSS and React Icons
🛠 Technology Stack
Frontend
- Framework: React 18 with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- Routing: React Router DOM v7
- Icons: React Icons (Heroicons & React Icons)
- Validation: Validator.js
- HTTP Client: Axios
Backend Integration
- API Base: http://localhost:5000/api
- Authentication: JWT Bearer tokens
- Endpoints: RESTful API for all CRUD operations
📁 Project Structure
src/
├── api/                    # API service layer
│   ├── api.ts            # Axios configuration with interceptors
│   └── services.ts        # API endpoints and methods
├── components/              # Reusable UI components
│   ├── CommonTable.tsx    # (Unused - can be removed)
│   ├── Pegination.tsx     # Pagination component
│   └── ProtectedRoute.tsx # Authentication wrapper
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state management
├── layouts/               # Page layouts
│   ├── DashbordLayout.tsx # Main dashboard layout
│   └── NavBar.tsx         # Navigation component
├── pages/                 # Page components
│   ├── Login.tsx           # Authentication page
│   ├── Dashboard.tsx        # Dashboard overview
│   ├── Profile.tsx          # User profile management
│   ├── ManageUser.tsx       # User list with filtering
│   ├── CreateUser.tsx       # User creation form
│   ├── EditUser.tsx         # User editing form
│   ├── Contacts.tsx         # Contact list with filtering
│   ├── CreateContacts.tsx    # Contact creation form
│   ├── EditContact.tsx       # Contact editing form
│   ├── Organizations.tsx    # Organization list with filtering
│   ├── CreateOrganization.tsx # Organization creation form
│   └── EditOrganization.tsx # Organization editing form
└── assets/                 # Static assets
🔧 Setup Instructions
Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on http://localhost:5000
Installation
# Clone the repository
git clone <repository-url>
cd dashboard
# Install dependencies
npm install
# Start development server
npm run dev
Build for Production
npm run build
Linting
npm run lint
📱 Available Pages & Features
User Management
- Manage User: /dashboard/manage-user - List, filter by email/name
- Create User: /dashboard/create-user - Add new users
- Edit User: /dashboard/edit-user/:id - Update user details
- Profile: /dashboard/profile - Edit current user profile
Contact Management  
- Contacts: /dashboard/contacts - List, filter by phone/city
- Create Contact: /dashboard/create-contact - Add new contacts
- Edit Contact: /dashboard/edit-contact/:id - Update contact details
Organization Management
- Organizations: /dashboard/organizations - List, filter by city
- Create Organization: /dashboard/create-organization - Add new organizations
- Edit Organization: /dashboard/edit-organization/:id - Update organization details
Authentication
- Login: / or /login - User authentication
- Protected Routes: All dashboard routes require authentication
🔐 Authentication Flow
1. Login: User submits credentials to /admin-users/login
2. Token Storage: JWT token stored in localStorage
3. Auto-login: Token checked on app initialization
4. Auto-logout: Invalid/expired tokens redirect to login
5. API Interceptors: Automatic token injection for all requests
🎯 Key Features
Filtering & Search
- Users: Search by email, first name, last name (case-insensitive)
- Contacts: Combined phone and city search in single input
- Organizations: City-based filtering with real-time updates
Form Validation
- Email: Format validation and required field checks
- Phone: Format validation with regex patterns
- Required Fields: All mandatory fields validated
- Error Display: Real-time error messages per field
Responsive Design
- Mobile: Stacked layouts with full-width inputs
- Tablet: Side-by-side form fields
- Desktop: Optimized spacing and layout
🔧 API Integration
Base Configuration
- URL: http://localhost:5000/api
- Timeout: 10 seconds
- Headers: Content-Type: application/json
- Auth: Authorization: Bearer <token>
Available Endpoints
// Users
POST /admin-users/login
GET  /admin-users/profile
PUT  /admin-users/profile
GET  /admin-users
POST /admin-users/register
PUT  /admin-users/:id
DELETE /admin-users/:id
// Contacts
GET  /contacts
POST /contacts
PUT  /contacts/:id
DELETE /contacts/:id
// Organizations
GET  /organizations
POST /organizations
PUT  /organizations/:id
DELETE /organizations/:id
🧹 Code Cleanup Recommendations
Files to Remove
- src/components/CommonTable.tsx - Unused component
- src/pages/Reports.tsx - Empty placeholder
- src/pages/Dashboard.tsx - Minimal placeholder (replace or expand)
- src/assets/react.svg - Unused default logo
Files to Review
- Fix TypeScript warnings in EditContact.tsx and EditOrganization.tsx
- Add missing fetchProfile dependency in Profile.tsx
🚀 Deployment
Environment Variables
VITE_API_URL=http://localhost:5000/api
Production Build
npm run build
# Output: dist/ directory
Preview
npm run preview
🐛 Troubleshooting
Common Issues
1. CORS Errors: Ensure backend allows http://localhost:5173
2. Authentication Fails: Check API server is running
3. Build Errors: Run npm run lint to fix TypeScript issues
4. Missing Data: Verify API endpoints match backend routes
Development Server
- Default Port: 5173
- API Backend: Expected on 5000
- Hot Reload: Enabled for development
📄 Scripts Reference
| Script | Description |
|--------|-------------|
| npm run dev | Start development server |
| npm run build | Build for production |
| npm run lint | Run ESLint |
| npm run preview | Preview production build |
🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Follow existing code patterns
5. Run linting before commits
6. Submit pull requests
