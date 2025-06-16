# Service API Routes & Postman Test Payloads

## Routes File (routes/serviceRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Core CRUD Routes
router.post('/services', serviceController.createService);
router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

// Additional Routes
router.delete('/services/:id/hard', serviceController.hardDeleteService);
router.patch('/services/:id/archive', serviceController.archiveService);
router.patch('/services/:id/restore', serviceController.restoreService);
router.get('/services/company/:companyId', serviceController.getServicesByCompany);
router.get('/services/category/:categoryId', serviceController.getServicesByCategory);
router.get('/services/search', serviceController.searchServices);
router.get('/services/stats', serviceController.getServiceStats);
router.patch('/services/bulk-update', serviceController.bulkUpdateServices);

module.exports = router;
```

## Main App Setup (app.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', serviceRoutes);

module.exports = app;
```

---

# Postman Collection Test Payloads

## 1. CREATE SERVICE
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/v1/services`  
**Headers:** `Content-Type: application/json`

### Sample Payload 1 (Complete Service):
```json
    {
    "company": "64f8b2c8e1234567890abcde",
    "name": "Premium Hair Cut & Styling",
    "serviceType": "Hair Care",
    "category": "64f8b2c8e1234567890abcdf",
    "description": "Professional hair cutting and styling service with premium products",
    "price": {
        "priceType": "fixed",
        "amount": 50
    },
    "duration": 60,
    "teamMembers": [
        "64f8b2c8e1234567890abce0",
        "64f8b2c8e1234567890abce1"
    ],
    "resourcesRequired": true,
    "resources": [
        "64f8b2c8e1234567890abce2",
        "64f8b2c8e1234567890abce3"
    ],
    "availableFor": "all",
    "isOnline": false,
    "status": "active",
    "rebookReminderAfter": {
        "count": 4,
        "period": "weeks"
    },
    "costOfService": 25
    }
```

### Sample Payload 2 (Minimal Service):
```json
{
  "name": "Basic Consultation",
  "serviceType": "Consultation",
  "category": "64f8b2c8e1234567890abcdf",
  "duration": 30,
  "price": {
    "priceType": "free"
  }
}
```

### Sample Payload 3 (Online Service):
```json
{
  "company": "64f8b2c8e1234567890abcde",
  "name": "Virtual Fitness Training",
  "serviceType": "Fitness",
  "category": "64f8b2c8e1234567890abcdf",
  "description": "One-on-one virtual fitness training session",
  "price": {
    "priceType": "from",
    "amount": 30
  },
  "duration": 45,
  "teamMembers": ["64f8b2c8e1234567890abce0"],
  "availableFor": "all",
  "isOnline": true,
  "status": "active",
  "costOfService": 10
}
```

---

## 2. GET ALL SERVICES
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/v1/services`

### Query Parameters (All Optional):
```
?page=1
&limit=10
&company=64f8b2c8e1234567890abcde
&category=64f8b2c8e1234567890abcdf
&serviceType=Hair Care
&status=active
&isOnline=false
&availableFor=all
&sortBy=createdAt
&sortOrder=desc
```

### Sample URLs:
```
GET {{baseUrl}}/api/v1/services
GET {{baseUrl}}/api/v1/services?page=1&limit=5
GET {{baseUrl}}/api/v1/services?company=64f8b2c8e1234567890abcde&status=active
GET {{baseUrl}}/api/v1/services?category=64f8b2c8e1234567890abcdf&isOnline=true
GET {{baseUrl}}/api/v1/services?serviceType=Hair Care&sortBy=name&sortOrder=asc
```

---

## 3. GET SERVICE BY ID
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/v1/services/{{serviceId}}`

### Sample URLs:
```
GET {{baseUrl}}/api/v1/services/64f8b2c8e1234567890abce4
```

---

## 4. UPDATE SERVICE
**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/v1/services/{{serviceId}}`  
**Headers:** `Content-Type: application/json`

### Sample Payload 1 (Price Update):
```json
{
  "price": {
    "priceType": "fixed",
    "amount": 65
  },
  "description": "Updated premium hair cutting service with advanced styling techniques"
}
```

### Sample Payload 2 (Team Members Update):
```json
{
  "teamMembers": [
    "64f8b2c8e1234567890abce0",
    "64f8b2c8e1234567890abce1",
    "64f8b2c8e1234567890abce5"
  ],
  "duration": 75
}
```

### Sample Payload 3 (Status Update):
```json
{
  "status": "archived",
  "rebookReminderAfter": {
    "count": 6,
    "period": "weeks"
  }
}
```

---

## 5. DELETE SERVICE (Soft Delete)
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/v1/services/{{serviceId}}`

### Sample URLs:
```
DELETE {{baseUrl}}/api/v1/services/64f8b2c8e1234567890abce4
```

---

## 6. HARD DELETE SERVICE
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/v1/services/{{serviceId}}/hard`

### Sample URLs:
```
DELETE {{baseUrl}}/api/v1/services/64f8b2c8e1234567890abce4/hard
```

---

## 7. ARCHIVE SERVICE
**Method:** `PATCH`  
**URL:** `{{baseUrl}}/api/v1/services/{{serviceId}}/archive`

### Sample URLs:
```
PATCH {{baseUrl}}/api/v1/services/64f8b2c8e1234567890abce4/archive
```

---

## 8. RESTORE SERVICE
**Method:** `PATCH`  
**URL:** `{{baseUrl}}/api/v1/services/{{serviceId}}/restore`

### Sample URLs:
```
PATCH {{baseUrl}}/api/v1/services/64f8b2c8e1234567890abce4/restore
```

---

## 9. GET SERVICES BY COMPANY
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/v1/services/company/{{companyId}}`

### Query Parameters:
```
?status=active
&page=1
&limit=10
```

### Sample URLs:
```
GET {{baseUrl}}/api/v1/services/company/64f8b2c8e1234567890abcde
GET {{baseUrl}}/api/v1/services/company/64f8b2c8e1234567890abcde?status=active&page=1&limit=5
```

---

## 10. GET SERVICES BY CATEGORY
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/v1/services/category/{{categoryId}}`

### Query Parameters:
```
?status=active
&page=1
&limit=10
```

### Sample URLs:
```
GET {{baseUrl}}/api/v1/services/category/64f8b2c8e1234567890abcdf
GET {{baseUrl}}/api/v1/services/category/64f8b2c8e1234567890abcdf?status=active&page=2&limit=5
```

---

## 11. SEARCH SERVICES
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/v1/services/search`

### Query Parameters:
```
?query=hair
&page=1
&limit=10
```

### Sample URLs:
```
GET {{baseUrl}}/api/v1/services/search?query=hair
GET {{baseUrl}}/api/v1/services/search?query=consultation&page=1&limit=5
GET {{baseUrl}}/api/v1/services/search?query=fitness training
```

---

## 12. GET SERVICE STATISTICS
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/v1/services/stats`

### Query Parameters (Optional):
```
?companyId=64f8b2c8e1234567890abcde
```

### Sample URLs:
```
GET {{baseUrl}}/api/v1/services/stats
GET {{baseUrl}}/api/v1/services/stats?companyId=64f8b2c8e1234567890abcde
```

---

## 13. BULK UPDATE SERVICES
**Method:** `PATCH`  
**URL:** `{{baseUrl}}/api/v1/services/bulk-update`  
**Headers:** `Content-Type: application/json`

### Sample Payload 1 (Status Update):
```json
{
  "serviceIds": [
    "64f8b2c8e1234567890abce4",
    "64f8b2c8e1234567890abce5",
    "64f8b2c8e1234567890abce6"
  ],
  "updateData": {
    "status": "archived"
  }
}
```

### Sample Payload 2 (Price Update):
```json
{
  "serviceIds": [
    "64f8b2c8e1234567890abce4",
    "64f8b2c8e1234567890abce5"
  ],
  "updateData": {
    "price": {
      "priceType": "fixed",
      "amount": 40
    },
    "costOfService": 20
  }
}
```

### Sample Payload 3 (Team Assignment):
```json
{
  "serviceIds": [
    "64f8b2c8e1234567890abce4",
    "64f8b2c8e1234567890abce5",
    "64f8b2c8e1234567890abce6"
  ],
  "updateData": {
    "teamMembers": [
      "64f8b2c8e1234567890abce0",
      "64f8b2c8e1234567890abce1"
    ],
    "resourcesRequired": true
  }
}
```

---

# Postman Environment Variables

Create these environment variables in Postman:

```json
{
  "baseUrl": "http://localhost:3000",
  "serviceId": "64f8b2c8e1234567890abce4",
  "companyId": "64f8b2c8e1234567890abcde",
  "categoryId": "64f8b2c8e1234567890abcdf"
}
```

---

# Sample Response Formats

## Success Response (Create/Update):
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "_id": "64f8b2c8e1234567890abce4",
    "company": {
      "_id": "64f8b2c8e1234567890abcde",
      "name": "Beauty Salon ABC",
      "email": "info@beautysalon.com"
    },
    "name": "Premium Hair Cut & Styling",
    "serviceType": "Hair Care",
    "category": {
      "_id": "64f8b2c8e1234567890abcdf",
      "name": "Hair Services",
      "description": "Professional hair care services"
    },
    "description": "Professional hair cutting and styling service",
    "price": {
      "priceType": "fixed",
      "amount": 50
    },
    "duration": 60,
    "teamMembers": [...],
    "resources": [...],
    "availableFor": "all",
    "isOnline": false,
    "status": "active",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

## Success Response (List with Pagination):
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Error Response:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Name is required",
    "Duration must be a positive number"
  ]
}
```

---

# Testing Checklist

## ✅ Basic CRUD Operations
- [ ] Create service with complete data
- [ ] Create service with minimal data
- [ ] Get all services
- [ ] Get service by ID
- [ ] Update service
- [ ] Delete service (soft)
- [ ] Hard delete service

## ✅ Advanced Operations
- [ ] Archive service
- [ ] Restore service
- [ ] Get services by company
- [ ] Get services by category
- [ ] Search services
- [ ] Get service statistics
- [ ] Bulk update services

## ✅ Error Handling
- [ ] Invalid ObjectId
- [ ] Missing required fields
- [ ] Validation errors
- [ ] Service not found
- [ ] Invalid query parameters

## ✅ Filtering & Pagination
- [ ] Filter by status
- [ ] Filter by company
- [ ] Filter by category
- [ ] Pagination with different page sizes
- [ ] Sorting by different fields

Remember to replace the ObjectId values in the payloads with actual IDs from your database!