Employee API - Postman Collection
Routes and Payloads for API Testing
1. Add Employee (Sign Up)
Route: POST /api/employees or POST /employees
Description: Creates a new employee account
Payload 1: Owner Employee with Password Auth
http://localhost:5001/api/v1/employee/signup
json{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "password": "SecurePassword123!",
  "isOwner": true,
  "authType": "password",
  "profilePicUrl": "https://example.com/profile.jpg",
  "dob": "1990-05-15",
  "phoneNumber": "+1234567890",
  "additionalPhoneNumber": "+0987654321",
  "country": "United States",
  "emergencyContacts": [
    {
      "name": "Jane Doe",
      "relationship": "Spouse",
      "email": "jane.doe@gmail.com",
      "phoneNumber": "+1122334455"
    }
  ],
  "isAvailableForNewJob": false
}
Payload 2: Regular Employee with Social Auth
json{
  "name": "Alice Smith",
  "email": "alice.smith@company.com",
  "isOwner": false,
  "authType": "social",
  "profilePicUrl": "https://example.com/alice-profile.jpg",
  "dob": "1985-08-22",
  "phoneNumber": "+1555666777",
  "country": "Canada",
  "isAvailableForNewJob": true,
  "emergencyContacts": [
    {
      "name": "Bob Smith",
      "relationship": "Brother",
      "email": "bob.smith@gmail.com",
      "phoneNumber": "+1888999000"
    },
    {
      "name": "Mary Smith",
      "relationship": "Mother",
      "email": "mary.smith@gmail.com",
      "phoneNumber": "+1777888999"
    }
  ]
}
Payload 3: Minimal Employee (Required fields only)
json{
  "name": "Mike Johnson",
  "email": "mike.johnson@company.com",
  "authType": "none"
}

2. Login Owner Employee
Route: POST /api/employees/login or POST /employees/login
Description: Authenticates owner employee and returns token
Payload:
json{
  "email": "john.doe@company.com",
  "password": "SecurePassword123!"
}

3. Update Employee with Job Profile
Route: PUT /api/employees/:employeeId or PATCH /employees/:employeeId
Description: Updates employee information and job profile
URL Example: /employees/64f7b1a2c8d4e5f6a7b8c9d0
Payload 1: Update Personal Information
json{
  "name": "John Updated Doe",
  "phoneNumber": "+1999888777",
  "profilePicUrl": "https://example.com/new-profile.jpg",
  "country": "Canada",
  "isAvailableForNewJob": true,
  "emergencyContacts": [
    {
      "name": "Jane Updated Doe",
      "relationship": "Wife",
      "email": "jane.updated@gmail.com",
      "phoneNumber": "+1666555444"
    }
  ]
}
Payload 2: Update Password
json{
  "password": "NewSecurePassword456!",
  "authType": "password"
}
Payload 3: Update Job Profile Reference
json{
  "jobProfile": "64f7b1a2c8d4e5f6a7b8c9d1",
  "isAvailableForNewJob": false
}
Payload 4: Update Portfolio
json{
  "portfolio": [
    "64f7b1a2c8d4e5f6a7b8c9d2",
    "64f7b1a2c8d4e5f6a7b8c9d3"
  ]
}

4. Archive Employee
Route: DELETE /api/employees/:employeeId or PUT /employees/:employeeId/archive
Description: Archives an employee (soft delete)
URL Example: /employees/64f7b1a2c8d4e5f6a7b8c9d0
Headers Required:
Authorization: Bearer <your_jwt_token>
No body required for this request

5. Search Company Employees
Route: GET /api/employees/search or GET /employees/search
Description: Searches employees by name within company
Query Parameters:

name (required): Search term for employee name

URL Examples:

/employees/search?name=John
/employees/search?name=Alice
/employees/search?name=smith

Headers Required:
Authorization: Bearer <owner_jwt_token>
No body required for this request

6. Get Employee By ID
Route: GET /api/employees/:employeeId or GET /employees/:employeeId
Description: Retrieves specific employee details
URL Example: /employees/64f7b1a2c8d4e5f6a7b8c9d0
Headers Required:
Authorization: Bearer <owner_jwt_token>
No body required for this request

Postman Environment Variables
Set up these environment variables in Postman for easier testing:
json{
  "baseUrl": "http://localhost:3000/api",
  "ownerToken": "",
  "employeeId": "",
  "companyId": ""
}
Common Headers for All Requests
json{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
Authentication Headers (where required)
json{
  "Authorization": "Bearer {{ownerToken}}"
}
Expected Response Formats
Success Response (Add Employee - Owner):
json{
  "data": {
    "_id": "64f7b1a2c8d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@company.com",
    "isEmailVerified": false,
    "isOwner": true,
    "authType": "password",
    "isAvailableForNewJob": false,
    "emergencyContacts": [],
    "portfolio": [],
    "createdAt": "2024-06-12T10:30:00.000Z",
    "updatedAt": "2024-06-12T10:30:00.000Z"
  },
  "success": true,
  "token": "jwt_token_here"
}
Success Response (Login):
json{
  "data": {
    "employee": {
      "_id": "64f7b1a2c8d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@company.com",
      "isOwner": true
    },
    "token": "jwt_token_here"
  },
  "success": true,
  "message": "Logged in successfully"
}
Error Response:
json{
  "success": false,
  "message": "Error message here"
}
Testing Scenarios
Test Case 1: Complete Employee Lifecycle

Create owner employee
Login with owner credentials
Create regular employee
Update employee information
Search for employees
Get employee by ID
Archive employee

Test Case 2: Validation Testing

Try creating employee without required fields
Try creating employee with duplicate email
Try updating with empty request body
Try accessing protected routes without token

Test Case 3: Authentication Testing

Login with correct credentials
Login with incorrect credentials
Access protected routes with valid token
Access protected routes with invalid/expired token

MongoDB ObjectId Format
When testing with actual database, use proper MongoDB ObjectId format:

Format: 64f7b1a2c8d4e5f6a7b8c9d0 (24 character hex string)
Generate new IDs for jobProfile and portfolio references