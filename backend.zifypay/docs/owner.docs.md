I'll help you understand how to create an owner in the system. Let me check the relevant files to understand the owner creation process.

First, let me look at the user routes since owner creation would likely be handled there:

Read file: Backend/routes/user.route.js
Let me check the user controller to see the implementation:

Read file: Backend/controllers/user.controller.js
Let me check the user validation schema:

Read file: Backend/validations/user.validation.js
Based on the code I've examined, here's how to create an owner in the system:

1. **API Endpoint**: 
   - Use POST request to `/api/v1/users`

2. **Required Request Body**:
```json
{
    "name": "Owner Name",
    "email": "owner@example.com",
    "password": "your_password",
    "phoneNumber": "+1234567890"  // Optional
}
```

3. **Validation Rules**:
   - `name`: Optional, 2-100 characters
   - `email`: Required, must be valid email format
   - `password`: Required, minimum 3 characters
   - `phoneNumber`: Optional, must follow E.164 format (e.g., +1234567890)

4. **Response**:
   - On success (201 Created):
   ```json
   {
       "data": {
           "user": {
               // user details
           },
           "token": "JWT_token"
       },
       "success": true,
       "message": "Added new user"
   }
   ```
   - On error (500):
   ```json
   {
       "message": "Error message"
   }
   ```

5. **Security Features**:
   - Password is automatically hashed using bcrypt
   - JWT token is generated upon successful creation
   - Input validation is performed before processing

To create an owner, you can use tools like Postman or curl with this example:

```bash
curl -X POST http://your-api-url/api/v1/users \
-H "Content-Type: application/json" \
-d '{
    "name": "Owner Name",
    "email": "owner@example.com",
    "password": "your_password",
    "phoneNumber": "+1234567890"
}'
```

After creation, you'll receive a JWT token that you should save and use for subsequent authenticated requests.

Would you like me to:
1. Show you how to test this endpoint?
2. Explain more about the security features?
3. Show you how to handle the response and use the token?