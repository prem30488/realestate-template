# Localities Management API

## Overview
This API provides complete CRUD operations for managing localities (areas/neighborhoods) within cities. Only users with **superadmin** or **admin** role with the "localities" privilege can access these endpoints.

## Setup Instructions

### 1. Run Migration
```bash
cd backend
npx sequelize-cli db:migrate
```

### 2. Seed Localities Data
Seeds data for Ahmedabad and Gandhinagar cities:
```bash
npx sequelize-cli db:seed:all
```

Or seed only localities:
```bash
npx sequelize-cli db:seed --seed 20260520120001-localities-seeder.js
```

## Authentication
All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Authorization
Only the following users can access localities endpoints:
- **Superadmin** - All users with `role: 'superadmin'`
- **Admin with privileges** - Admin users with `"localities"` in their `privileges` array

## Database Schema

### Localities Table
```sql
CREATE TABLE Localities (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  city_id INTEGER NOT NULL (Foreign Key to Cities),
  name VARCHAR(255) NOT NULL,
  postal_code VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## API Endpoints

### 1. GET /api/localities - List All Localities
Fetch all localities with pagination, search, and city filtering.

**Query Parameters:**
- `page` (number, default: 1) - Page number for pagination
- `limit` (number, default: 10) - Number of records per page
- `search` (string, optional) - Search by locality name or postal code
- `city_id` (number, optional) - Filter by city ID

**Example Request:**
```bash
curl -X GET 'http://localhost:5000/api/localities?page=1&limit=10&search=Satellite&city_id=1' \
  -H 'Authorization: Bearer <token>'
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "city_id": 1,
      "name": "Satellite",
      "postal_code": "380015",
      "latitude": "23.02250000",
      "longitude": "72.57140000",
      "createdAt": "2026-05-20T12:00:00.000Z",
      "updatedAt": "2026-05-20T12:00:00.000Z",
      "city": {
        "id": 1,
        "name": "Ahmedabad"
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### 2. GET /api/localities/:id - Get Single Locality
Fetch details of a specific locality by ID.

**Example Request:**
```bash
curl -X GET 'http://localhost:5000/api/localities/1' \
  -H 'Authorization: Bearer <token>'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "city_id": 1,
    "name": "Satellite",
    "postal_code": "380015",
    "latitude": "23.02250000",
    "longitude": "72.57140000",
    "createdAt": "2026-05-20T12:00:00.000Z",
    "updatedAt": "2026-05-20T12:00:00.000Z",
    "city": {
      "id": 1,
      "name": "Ahmedabad"
    }
  }
}
```

---

### 3. POST /api/localities - Create New Locality
Create a new locality.

**Request Body:**
```json
{
  "city_id": 1,
  "name": "Thaltej",
  "postal_code": "380054",
  "latitude": 23.0314,
  "longitude": 72.5625
}
```

**Required Fields:**
- `city_id` (number) - Must be an existing city ID
- `name` (string) - Name of the locality

**Optional Fields:**
- `postal_code` (string)
- `latitude` (number)
- `longitude` (number)

**Example Request:**
```bash
curl -X POST 'http://localhost:5000/api/localities' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "city_id": 1,
    "name": "Vastrapur",
    "postal_code": "380015",
    "latitude": 23.0198,
    "longitude": 72.5407
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Locality created successfully",
  "data": {
    "id": 5,
    "city_id": 1,
    "name": "Vastrapur",
    "postal_code": "380015",
    "latitude": "23.01980000",
    "longitude": "72.54070000",
    "createdAt": "2026-05-20T12:05:00.000Z",
    "updatedAt": "2026-05-20T12:05:00.000Z",
    "city": {
      "id": 1,
      "name": "Ahmedabad"
    }
  }
}
```

---

### 4. PUT /api/localities/:id - Update Locality
Update an existing locality.

**Request Body (all fields optional):**
```json
{
  "city_id": 1,
  "name": "Updated Name",
  "postal_code": "380015",
  "latitude": 23.0198,
  "longitude": 72.5407
}
```

**Example Request:**
```bash
curl -X PUT 'http://localhost:5000/api/localities/1' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Satellite (Updated)",
    "postal_code": "380015"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Locality updated successfully",
  "data": {
    "id": 1,
    "city_id": 1,
    "name": "Satellite (Updated)",
    "postal_code": "380015",
    "latitude": "23.02250000",
    "longitude": "72.57140000",
    "createdAt": "2026-05-20T12:00:00.000Z",
    "updatedAt": "2026-05-20T12:05:30.000Z",
    "city": {
      "id": 1,
      "name": "Ahmedabad"
    }
  }
}
```

---

### 5. DELETE /api/localities/:id - Delete Locality
Delete a locality by ID.

**Example Request:**
```bash
curl -X DELETE 'http://localhost:5000/api/localities/5' \
  -H 'Authorization: Bearer <token>'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Locality deleted successfully"
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied: Insufficient privileges"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Locality not found"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "city_id and name are required"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Error creating locality",
  "error": "<error_details>"
}
```

---

## Seeded Data

### Ahmedabad Localities (8 entries)
1. Satellite (380015)
2. Thaltej (380054)
3. Vastrapur (380015)
4. Ghatlodia (380061)
5. Paldi (380007)
6. Navrangpura (380009)
7. Ambawadi (380006)
8. Memnagar (380006)

### Gandhinagar Localities (6 entries)
1. Sector 1 (382001)
2. Sector 7 (382007)
3. Sector 12 (382012)
4. Sector 18 (382018)
5. Sector 20 (382020)
6. Sector 25 (382025)

---

## Usage Examples

### JavaScript/Fetch
```javascript
const token = 'your_jwt_token';

// Get localities with pagination
fetch('http://localhost:5000/api/localities?page=1&limit=10', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));

// Create new locality
fetch('http://localhost:5000/api/localities', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    city_id: 1,
    name: 'New Locality',
    postal_code: '380001',
    latitude: 23.1815,
    longitude: 72.6311
  })
})
.then(res => res.json())
.then(data => console.log(data));

// Update locality
fetch('http://localhost:5000/api/localities/1', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Locality Name'
  })
})
.then(res => res.json())
.then(data => console.log(data));

// Delete locality
fetch('http://localhost:5000/api/localities/1', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## Model Associations

### City → Locality
One City has many Localities:
```
City.hasMany(Locality, { foreignKey: 'city_id', as: 'localities' })
Locality.belongsTo(City, { foreignKey: 'city_id', as: 'city' })
```

---

## Files Created

1. **Migration**: `backend/migrations/20260520120000-create-locality.js`
2. **Model**: `backend/models/locality.js`
3. **Seeder**: `backend/seeders/20260520120001-localities-seeder.js`
4. **Routes**: `backend/routes/localitiesRoutes.js`
5. **Updated**: `backend/models/city.js` - Added association
6. **Updated**: `backend/index.js` - Imported Locality and routes

---

## Notes

- All locality data is case-sensitive for search functionality
- Pagination starts at page 1
- The search function searches both name and postal_code fields (case-insensitive)
- Latitude and Longitude are stored as DECIMAL(10,8) and DECIMAL(11,8) for precision
- Foreign key constraint ensures city_id must reference an existing city
- Deleting a locality will not affect other records (no cascading deletes of related data)
