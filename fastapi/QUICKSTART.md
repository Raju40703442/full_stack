# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Backend

```bash
cd fastapi/fastapienv
Scripts\activate  # Windows
pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] python-dotenv python-multipart email-validator
uvicorn app.main:app --reload
```

Backend runs at: **http://localhost:8000**

### Frontend

```bash
cd reactjs
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 📝 First Time Setup

1. **Create `.env` file in `fastapi/fastapienv/`:**
   ```
   SECRET_KEY=your-super-secret-key-here-change-this-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   DATABASE_URL=sqlite:///./test.db
   ```

2. **Start Backend Server**
   - Keeps the terminal running

3. **Start Frontend Development Server**
   - In another terminal

4. **Open Browser**
   - Go to http://localhost:5173
   - Click "Register" to create account
   - Login with your credentials

---

## 🎯 Test the App

### Register New User
1. Click "Register"
2. Fill in username, email, password
3. Click "Register" button
4. Redirects to Dashboard on success

### Login
1. Click "Login"
2. Enter email and password
3. Click "Login" button
4. Redirects to Dashboard

### Manage Employees
1. From Dashboard, click "Employees" or "View Employees"
2. Click "+ Add Employee"
3. Fill in employee details
4. Click "Add Employee"
5. View, Edit, or Delete employees

### Manage Tasks
1. From Dashboard, click "Tasks" or "View Tasks"
2. Click "+ Add Task"
3. Fill in task details (Title, Description, Status, Priority)
4. Click "Add Task"
5. View, Edit, or Delete tasks

---

## 📊 API Documentation

### Auth Endpoints
- **Register**: `POST /api/auth/register`
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Login**: `POST /api/auth/login`
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Get Current User**: `GET /api/auth/me`
  - Header: `Authorization: Bearer {token}`

### Employees Endpoints
- **Get All**: `GET /api/employees`
- **Create**: `POST /api/employees`
- **Update**: `PUT /api/employees/{id}`
- **Delete**: `DELETE /api/employees/{id}`

### Tasks Endpoints
- **Get All**: `GET /api/tasks`
- **Create**: `POST /api/tasks`
- **Update**: `PUT /api/tasks/{id}`
- **Delete**: `DELETE /api/tasks/{id}`

---

## ⚡ Features

- ✅ User Registration & Login (JWT)
- ✅ Password Hashing (bcrypt)
- ✅ Protected Routes
- ✅ Employee Management (CRUD)
- ✅ Task Management (CRUD)
- ✅ Dashboard with Statistics
- ✅ Responsive Design
- ✅ OAuth2.0 Ready

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Install all dependencies: `pip install -r requirements.txt` |
| API 404 errors | Check if backend server is running on port 8000 |
| Login not working | Check email/password, ensure database is created |
| Styles not loading | Clear browser cache (Ctrl+Shift+Delete) |
| CORS errors | Backend CORS is configured for port 5173 |

---

## 📁 File Structure

```
Backend:
- app/main.py → FastAPI setup
- app/auth_router.py → Login/Register
- app/employees_router.py → Employee CRUD
- app/tasks_router.py → Task CRUD
- app/models.py → Database models
- app/schemas.py → Data validation

Frontend:
- src/pages/Login.jsx → Login page
- src/pages/Register.jsx → Register page
- src/pages/Dashboard.jsx → Main dashboard
- src/pages/Employees.jsx → Employee management
- src/pages/Tasks.jsx → Task management
- src/context/AuthContext.jsx → Auth state
- src/api/client.js → API calls
```

---

## 🔐 Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWTs expire after 30 minutes (configurable)
- ✅ Tokens stored in browser localStorage
- ✅ CORS enabled for development
- ✅ All protected endpoints require authentication

For production:
- Change SECRET_KEY to a long random string
- Use environment variables for secrets
- Enable HTTPS
- Implement refresh tokens
- Add rate limiting

---

## 📚 Next Steps

1. Deploy to production
2. Add email verification
3. Implement password reset
4. Add Google OAuth2 integration
5. Create admin dashboard
6. Add real-time notifications
7. Implement role-based access control

---

**Happy Coding! 🎉**
