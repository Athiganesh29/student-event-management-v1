# Admin User Setup

## 🔐 Admin Credentials

The system has been configured with a static admin user in the database:

## 🚀 How to Access Admin Panel

1. **Start the backend server:**
   ```bash
   cd event-management-portal/backend
   npm start
   ```

2. **Open the frontend login page:**
   - Navigate to `zvent/frontend/login.html`

3. **Login with admin credentials:**
   - Email: `admin@zvent.com`
   - Password: `*******`

4. **Automatic redirect:**
   - Admin users will be automatically redirected to `admin.html`
   - Regular users will be redirected to `register.html`

## 🔧 Admin Features

- **Role-based authentication:** Only users with `role: 'admin'` can access admin panel
- **Automatic redirect:** Login system detects admin role and redirects accordingly
- **Session management:** Admin sessions are managed the same way as regular users
- **Security:** Admin authentication is checked on every admin page load

## 🛠️ Managing Admin Users

### Create New Admin User
To create additional admin users, you can either:

1. **Use the seeder script:**
   ```bash
   npm run seed-admin
   ```

2. **Manually update in database:**
   ```javascript
   // In MongoDB, update user role
   db.users.updateOne(
     { email: "user@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Reset Admin Password
```bash
# Run the seeder again to reset admin user
npm run seed-admin
```

## 🔒 Security Notes

- Admin credentials are stored securely in MongoDB with bcrypt hashing
- Admin role is checked on both frontend and backend
- Admin sessions use the same JWT token system as regular users
- Admin authentication is validated on every admin page access

## 📝 Database Schema

The User model now includes a `role` field:
```javascript
{
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}
```

## 🧪 Testing Admin Login

You can test the admin login using the API:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@zvent.com","password":"Admin123!"}'
```

The response will include `"role": "admin"` in the user data.
