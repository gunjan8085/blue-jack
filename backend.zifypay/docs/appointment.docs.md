# Appointment API Routes and Payloads

## Routes Configuration (Express.js)

```javascript
// routes/appointment.routes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { authenticateUser, authenticateEmployee, authenticateBusiness } = require('../middleware/auth');

// Create appointment routes
router.post('/user', authenticateUser, appointmentController.createAppointmentByUser);
router.post('/employee', authenticateEmployee, appointmentController.createAppointmentByEmployee);

// Get appointments routes
router.get('/client/:clientId', authenticateUser, appointmentController.getAppointmentsByClientId);
router.get('/client/:clientId/all', authenticateUser, appointmentController.getAllAppointmentsByClientId);
router.get('/business/:businessId', authenticateBusiness, appointmentController.getAppointmentsByBusinessId);
router.get('/business/:businessId/all', authenticateBusiness, appointmentController.getAllAppointmentsByBusinessId);

module.exports = router;
```

## API Endpoints & Payloads

### 1. Create Appointment by User
**POST** `/api/appointments/user`

**Headers:**
```
Authorization: Bearer {userToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "serviceId": "64a5b2c3d4e5f6789012345a",
  "businessId": "64a5b2c3d4e5f6789012345b",
  "appointmentDate": "2025-06-20",
  "appointmentTime": "14:30",
  "duration": 60,
  "notes": "First time appointment for hair cut",
  "teamMember": "64a5b2c3d4e5f6789012345c",
  "clientInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890"
  },
  "preferences": {
    "reminderSMS": true,
    "reminderEmail": false
  }
}
```

**Success Response:**
```json
{
  "data": {
    "appointmentId": "64a5b2c3d4e5f6789012345e",
    "status": "pending",
    "confirmationCode": "APT-2025-001"
  },
  "success": true,
  "message": "Appointment created successfully"
}
```

### 2. Create Appointment by Employee
**POST** `/api/appointments/employee`

**Headers:**
```
Authorization: Bearer {employeeToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "serviceId": "64a5b2c3d4e5f6789012345a",
  "clientId": "64a5b2c3d4e5f6789012345d",
  "appointmentDate": "2025-06-21",
  "appointmentTime": "10:00",
  "duration": 90,
  "notes": "Regular checkup appointment - client has allergies",
  "teamMember": "64a5b2c3d4e5f6789012345c",
  "status": "confirmed",
  "paymentStatus": "pending",
  "resources": ["64a5b2c3d4e5f6789012345f"],
  "internalNotes": "VIP client - handle with care"
}
```

### 3. Get Appointments by Client ID (Paginated)
**GET** `/api/appointments/client/{clientId}?page=1&limit=10`

**Example URL:**
```
GET /api/appointments/client/64a5b2c3d4e5f6789012345d?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer {userToken}
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

### 4. Get All Appointments by Client ID
**GET** `/api/appointments/client/{clientId}/all`

**Example URL:**
```
GET /api/appointments/client/64a5b2c3d4e5f6789012345d/all
```

### 5. Get Appointments by Business ID (Paginated with Filters)
**GET** `/api/appointments/business/{businessId}`

**Example URL:**
```
GET /api/appointments/business/64a5b2c3d4e5f6789012345b?page=1&limit=20&status=confirmed&startDate=2025-06-01&endDate=2025-06-30&bookedWith=64a5b2c3d4e5f6789012345c
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by appointment status
- `startDate` (optional): Filter appointments from this date (YYYY-MM-DD)
- `endDate` (optional): Filter appointments until this date (YYYY-MM-DD)
- `bookedWith` (optional): Filter by team member ID

### 6. Get All Appointments by Business ID (with Filters)
**GET** `/api/appointments/business/{businessId}/all`

**Example URL:**
```
GET /api/appointments/business/64a5b2c3d4e5f6789012345b/all?status=pending&startDate=2025-06-15&endDate=2025-07-15
```

## Additional Test Scenarios

### Error Testing Payloads

#### Invalid Service ID
```json
{
  "serviceId": "invalid_id",
  "businessId": "64a5b2c3d4e5f6789012345b",
  "appointmentDate": "2025-06-20",
  "appointmentTime": "14:30"
}
```

#### Missing Required Fields
```json
{
  "serviceId": "64a5b2c3d4e5f6789012345a",
  "appointmentDate": "2025-06-20"
  // Missing appointmentTime, businessId
}
```

#### Past Date Appointment
```json
{
  "serviceId": "64a5b2c3d4e5f6789012345a",
  "businessId": "64a5b2c3d4e5f6789012345b",
  "appointmentDate": "2025-01-01",
  "appointmentTime": "14:30"
}
```

## Service-Related Test Data

Based on your Service model, here are realistic service IDs and data:

### Sample Services for Testing
```json
{
  "hairCutService": {
    "_id": "64a5b2c3d4e5f6789012345a",
    "name": "Premium Hair Cut",
    "serviceType": "hair_styling",
    "duration": 60,
    "price": {
      "priceType": "fixed",
      "amount": 50
    },
    "availableFor": "all"
  },
  "massageService": {
    "_id": "64a5b2c3d4e5f678901234ab",
    "name": "Deep Tissue Massage",
    "serviceType": "wellness",
    "duration": 90,
    "price": {
      "priceType": "from",
      "amount": 80
    },
    "availableFor": "all",
    "resourcesRequired": true
  },
  "consultationService": {
    "_id": "64a5b2c3d4e5f678901234ac",
    "name": "Business Consultation",
    "serviceType": "consultation",
    "duration": 30,
    "price": {
      "priceType": "free",
      "amount": 0
    },
    "isOnline": true
  }
}
```

## Environment Variables for Postman

```
baseURL: http://localhost:3000
userToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
employeeToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
businessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Test Scenarios Checklist

- [ ] Create appointment with valid data
- [ ] Create appointment with invalid service ID
- [ ] Create appointment with past date
- [ ] Create appointment without authentication
- [ ] Get appointments with valid client ID
- [ ] Get appointments with invalid client ID
- [ ] Get appointments with pagination
- [ ] Get appointments with date filters
- [ ] Get appointments with status filters
- [ ] Get appointments with team member filters
- [ ] Test rate limiting (if implemented)
- [ ] Test concurrent appointment creation
- [ ] Test appointment creation for different service types (online/offline)
- [ ] Test appointment creation with resource requirements