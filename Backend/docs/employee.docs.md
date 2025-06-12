I'll help you create a Postman API payload documentation for the employee endpoints based on the code I see. I'll organize this by endpoint with their respective request methods, URLs, headers, and body payloads.

### Base URL
```
http://localhost:3000/api/v1/employee
```

### 1. Search Company Employees
**GET** `/api/v1/employee`
- **Headers:**
  ```
  Authorization: Bearer <business_token>
  ```
- **Query Parameters:**
  ```
  name: <employee_name>
  ```
- **Response:**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "employee_id",
        "name": "John Doe",
        "email": "john@example.com",
        "isEmailVerified": false,
        "isOwner": false,
        "profilePicUrl": "url_to_pic",
        "dob": "1990-01-01",
        "phoneNumber": "1234567890",
        "country": "USA",
        "emergencyContacts": [],
        "isAvailableForNewJob": false,
        "jobProfile": "job_profile_id",
        "authType": "password"
      }
    ]
  }
  ```

### 2. Get Employee by ID
**GET** `/api/v1/employee/:employeeId`
- **Headers:**
  ```
  Authorization: Bearer <business_token>
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "employee_id",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": false,
      "isOwner": false,
      "profilePicUrl": "url_to_pic",
      "dob": "1990-01-01",
      "phoneNumber": "1234567890",
      "country": "USA",
      "emergencyContacts": [],
      "isAvailableForNewJob": false,
      "jobProfile": "job_profile_id",
      "authType": "password"
    }
  }
  ```

### 3. Add Employee (Signup)
**POST** `/api/v1/employee/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "isOwner": false,
    "profilePicUrl": "url_to_pic",
    "dob": "1990-01-01",
    "phoneNumber": "1234567890",
    "additionalPhoneNumber": "0987654321",
    "country": "USA",
    "emergencyContacts": [
      {
        "name": "Emergency Contact",
        "relationship": "Spouse",
        "email": "emergency@example.com",
        "phoneNumber": "1112223333"
      }
    ],
    "isAvailableForNewJob": false,
    "authType": "password"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "_id": "employee_id",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": false,
      "isOwner": false,
      "profilePicUrl": "url_to_pic",
      "dob": "1990-01-01",
      "phoneNumber": "1234567890",
      "country": "USA",
      "emergencyContacts": [],
      "isAvailableForNewJob": false,
      "authType": "password"
    },
    "success": true
  }
  ```

### 4. Employee Login
**POST** `/api/v1/employee/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "employee": {
        "_id": "employee_id",
        "name": "John Doe",
        "email": "john@example.com",
        "isEmailVerified": false,
        "isOwner": false,
        "profilePicUrl": "url_to_pic",
        "dob": "1990-01-01",
        "phoneNumber": "1234567890",
        "country": "USA",
        "emergencyContacts": [],
        "isAvailableForNewJob": false,
        "authType": "password"
      },
      "token": "jwt_token_here"
    },
    "success": true,
    "message": "Logged in successfully"
  }
  ```

### 5. Update Employee
**PATCH** `/api/v1/employee/:employeeId`
- **Headers:**
  ```
  Authorization: Bearer <business_token>
  ```
- **Body:**
  ```json
  {
    "name": "John Updated",
    "phoneNumber": "9876543210",
    "country": "Canada",
    "isAvailableForNewJob": true
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "_id": "employee_id",
      "name": "John Updated",
      "email": "john@example.com",
      "phoneNumber": "9876543210",
      "country": "Canada",
      "isAvailableForNewJob": true
    },
    "success": true
  }
  ```

### 6. Archive Employee
**PATCH** `/api/v1/employee/:employeeId/archive`
- **Headers:**
  ```
  Authorization: Bearer <business_token>
  ```
- **Response:**
  ```json
  {
    "message": "Employee archived successfully",
    "success": true
  }
  ```

### Important Notes:
1. All endpoints that require authentication need a valid business token in the Authorization header
2. The token should be in the format: `Bearer <token>`
3. For protected routes, the user must be an owner (checkIsOwner middleware)
4. The signup endpoint validates the input using newUserValidation
5. All dates should be in ISO format
6. The base URL might need to be adjusted based on your server configuration

You can import these endpoints into Postman by creating a new collection and adding each endpoint with its respective configuration. Remember to set up environment variables for the base URL and tokens to make testing easier.