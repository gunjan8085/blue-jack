I'll help you create API payloads and routes for testing in Postman based on the existing codebase. I'll analyze the current routes and create comprehensive test payloads.

From the codebase, I can see there are two main user-related endpoints:
1. User Registration (POST /)
2. User Login (POST /login)

Let me create a detailed Postman collection format with the routes and payloads:

### 1. User Registration
**Endpoint:** POST /
**URL:** `{{base_url}}/api/v1/users`
**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "phoneNumber": "+1234567890",
    "country": "United States",
    "profilePicUrl": "https://example.com/profile.jpg"
}
```

### 2. User Login
**Endpoint:** POST /login
**URL:** `{{base_url}}/api/v1/users/login`
**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
}
```

### Expected Responses:

1. **User Registration Success Response (201):**
```json
{
    "data": {
        "user": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phoneNumber": "+1234567890",
            "country": "United States",
            "profilePicUrl": "https://example.com/profile.jpg",
            "favourites": [],
            "recentlyViewed": null,
            "_id": "...",
            "createdAt": "...",
            "updatedAt": "..."
        },
        "token": "..."
    },
    "success": true,
    "message": "Added new user"
}
```

2. **User Login Success Response (200):**
```json
{
    "data": {
        "user": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phoneNumber": "+1234567890",
            "country": "United States",
            "profilePicUrl": "https://example.com/profile.jpg",
            "favourites": [],
            "recentlyViewed": null,
            "_id": "...",
            "createdAt": "...",
            "updatedAt": "..."
        },
        "token": "..."
    },
    "success": true,
    "message": "Logged in successfully"
}
```

### Error Responses:

1. **Validation Error (400):**
```json
{
    "message": "Validation Error",
    "errors": [
        {
            "field": "email",
            "message": "Invalid email format"
        }
    ]
}
```

2. **Server Error (500):**
```json
{
    "message": "Internal Server Error"
}
```

### Postman Environment Variables:
```
base_url: http://localhost:3000
```

### Testing Tips:
1. First test the registration endpoint to create a new user
2. Use the credentials from registration to test the login endpoint
3. Save the token from the login response for authenticated requests
4. Test error cases by:
   - Using invalid email formats
   - Using duplicate email addresses
   - Using weak passwords
   - Missing required fields

Would you like me to provide any additional details or specific test cases for these endpoints?