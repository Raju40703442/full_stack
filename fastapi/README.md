# Employee Task Management System

A full-stack web application for managing employees and tasks with JWT and OAuth2.0 authentication.

## Features

✅ **User Authentication**
- Registration and Login with JWT tokens
- OAuth2.0 ready for Google integration
- Secure password hashing with bcrypt
- Protected routes and endpoints

✅ **Employee Management**
- Create, read, update, delete employees
- Track department and position
- User-specific employee lists

✅ **Task Management**
- Create and manage tasks
- Set task status (pending, in progress, completed)
- Priority levels (low, medium, high)
- Task assignment to projects

✅ **Dashboard**
- Overview of employees and tasks
- Quick statistics
- Navigation to management pages

## Project Structure

```
fullstack_app/
├── fastapi/
│   └── fastapienv/
│       ├── app/
│       │   ├── main.py           # FastAPI entry point
│       │   ├── models.py         # SQLAlchemy models
│       │   ├── schemas.py        # Pydantic schemas
│       │   ├── config.py         # Configuration
│       │   ├── auth_service.py   # JWT & password utilities
│       │   ├── auth_router.py    # Auth endpoints
│       │   ├── employees_router.py
│       │   └── tasks_router.py
│       └── .env                  # Environment variables
└── reactjs/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx   # Auth state management
    │   ├── api/
    │   │   └── client.js         # API client
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Employees.jsx
    │   │   └── Tasks.jsx
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   └── styles/
    │       ├── Auth.css
    │       ├── Dashboard.css
    │       └── Management.css
    └── package.json
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd fastapi/fastapienv
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   Scripts\activate

   # macOS/Linux
   source bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] python-dotenv python-multipart email-validator
   ```

4. **Configure .env file**
   ```
   SECRET_KEY=your-secret-key-change-this-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   DATABASE_URL=sqlite:///./test.db
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```
   Server will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd reactjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Employees
- `GET /api/employees` - List all employees (protected)
- `POST /api/employees` - Create employee (protected)
- `GET /api/employees/{id}` - Get employee details (protected)
- `PUT /api/employees/{id}` - Update employee (protected)
- `DELETE /api/employees/{id}` - Delete employee (protected)

### Tasks
- `GET /api/tasks` - List all tasks (protected)
- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks/{id}` - Get task details (protected)
- `PUT /api/tasks/{id}` - Update task (protected)
- `DELETE /api/tasks/{id}` - Delete task (protected)

## Authentication Flow

1. **Register** → User creates account at `/register`
2. **Login** → User logs in at `/login`
3. **JWT Token** → Backend returns access token
4. **Storage** → Token stored in localStorage
5. **Protected Routes** → ProtectedRoute component checks auth
6. **API Requests** → Token sent in Authorization header
7. **Auto-logout** → Redirected to login if token invalid

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- hashed_password
- is_active
- created_at

### Employees Table
- id (Primary Key)
- user_id (Foreign Key)
- first_name
- last_name
- email
- department
- position
- created_at

### Tasks Table
- id (Primary Key)
- user_id (Foreign Key)
- project_id (Foreign Key)
- title
- description
- status (pending, in_progress, completed)
- priority (low, medium, high)
- created_at

### Projects Table
- id (Primary Key)
- user_id (Foreign Key)
- name
- description
- created_at

## Security Features

✅ **Password Security**
- Bcrypt hashing
- Salted passwords
- Minimum 6 characters

✅ **JWT Security**
- HS256 algorithm
- Token expiration (30 minutes default)
- Refresh token support (can be implemented)

✅ **CORS Protection**
- Configured for frontend origin
- Credentials enabled

✅ **SQL Injection Prevention**
- SQLAlchemy ORM
- Parameterized queries

## OAuth2.0 Integration (Ready)

To enable Google OAuth2:

1. Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
2. Add to `.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
3. Implement OAuth endpoint in `auth_router.py`

## Styling

Modern gradient-based UI with:
- Responsive design
- Smooth animations
- Color-coded status badges
- Mobile-friendly layouts

## Future Enhancements

- [ ] Google OAuth2 implementation
- [ ] Email notifications
- [ ] Task assignmentfeatures
- [ ] File uploads
- [ ] Real-time notifications with WebSockets
- [ ] Advanced filtering and search
- [ ] Analytics dashboard
- [ ] User roles and permissions
- [ ] Two-factor authentication

## Troubleshooting

### Backend Issues

**CORS Error**: Update `CORS_ALLOWED_ORIGINS` in config.py

**Database Error**: Check DATABASE_URL and ensure directory exists

**Port Already in Use**: Run on different port:
```bash
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**API Connection Error**: Check backend is running and API_BASE_URL is correct

**Token Not Saving**: Clear browser cache and localStorage

**Route Not Found**: Ensure Router wraps all routes in App.jsx

## Support

For issues and questions:
1. Check API responses for error messages
2. Verify environment variables are set
3. Check browser console for frontend errors
4. Check terminal for backend errors

## License

This project is open source and available for educational purposes.
