# Induction Programme Admin Panel API Documentation

## Introduction

This API allows administrators to manage rooms and assign students to rooms during the Induction Programme. The API is built using Express and uses JSON files for storage.

## Base URL

http://localhost:3000/

## Endpoints Overview

### Rooms Management

- **POST** `/rooms` - Create a new room.
- **GET** `/rooms` - Retrieve all rooms.
- **PUT** `/rooms/:roomName` - Update an existing room.
- **DELETE** `/rooms/:roomName` - Delete a room.

### Students Management

- **POST** `/students` - Add a new student.
- **GET** `/students/:admissionId?` - Retrieve all students or a specific student by ID.
- **PUT** `/students/:admissionId` - Update an existing student's information.
- **DELETE** `/students/:admissionId` - Delete a student.
- **POST** `/students/assign` - Assign students to a room.
- **PUT** `/students/edit/:roomName` - Edit student assignments in a room.

---

## Rooms Management

### 1. Create a New Room

- **Endpoint**: `/rooms`
- **Method**: `POST`
- **Description**: Creates a new room with specified details.
- **Request Body**:
    ```json
    {
        "block": "A",
        "floor": "1st",
        "roomName": "A101",
        "capacity": 10
    }
    ```
- **Response**: Returns the created room object.
    ```json
    {
        "block": "A",
        "floor": "1st",
        "roomName": "A101",
        "capacity": 10,
        "students": []
    }
    ```
- **Status Codes**:
  - `201 Created`: Room was successfully created.
  - `400 Bad Request`: Invalid data.

### 2. Get All Rooms

- **Endpoint**: `/rooms`
- **Method**: `GET`
- **Description**: Retrieves a list of all rooms.
- **Response**: Returns an array of room objects.
    ```json
    [
        {
            "block": "A",
            "floor": "1st",
            "roomName": "A101",
            "capacity": 10,
            "students": ["101", "102"]
        },
        ...
    ]
    ```
- **Status Codes**:
  - `200 OK`: Rooms were successfully retrieved.

### 3. Update a Room

- **Endpoint**: `/rooms/:roomName`
- **Method**: `PUT`
- **Description**: Updates the details of an existing room.
- **Path Parameters**:
  - `roomName`: The name of the room to update (e.g., `A101`).
- **Request Body**:
    ```json
    {
        "block": "A",
        "floor": "2nd",
        "capacity": 15
    }
    ```
- **Response**: Returns the updated room object.
    ```json
    {
        "block": "A",
        "floor": "2nd",
        "roomName": "A101",
        "capacity": 15,
        "students": ["101", "102"]
    }
    ```
- **Status Codes**:
  - `200 OK`: Room was successfully updated.
  - `404 Not Found`: Room does not exist.

### 4. Delete a Room

- **Endpoint**: `/rooms/:roomName`
- **Method**: `DELETE`
- **Description**: Deletes an existing room.
- **Path Parameters**:
  - `roomName`: The name of the room to delete (e.g., `A101`).
- **Response**: Returns a success message.
    ```json
    {
        "message": "Room deleted successfully"
    }
    ```
- **Status Codes**:
  - `200 OK`: Room was successfully deleted.
  - `404 Not Found`: Room does not exist.

---

## Students Management

### 1. Add a New Student

- **Endpoint**: `/students`
- **Method**: `POST`
- **Description**: Adds a new student to the system.
- **Request Body**:
    ```json
    {
        "admissionId": "101",
        "name": "John Doe"
    }
    ```
- **Response**: Returns the created student object.
    ```json
    {
        "admissionId": "101",
        "name": "John Doe",
        "assignedRoom": null,
        "assignedFloor": null,
        "assignedBlock": null
    }
    ```
- **Status Codes**:
  - `201 Created`: Student was successfully added.
  - `400 Bad Request`: Student already exists or invalid data.

### 2. Get All Students or a Specific Student by ID

- **Endpoint**: `/students/:admissionId?`
- **Method**: `GET`
- **Description**: Retrieves all students or a specific student by their Admission ID.
- **Path Parameters**:
  - `admissionId` (optional): The Admission ID of the student to retrieve.
- **Response**:
  - If an `admissionId` is provided, returns the student object.
    ```json
    {
        "admissionId": "101",
        "name": "John Doe",
        "assignedRoom": "A101",
        "assignedFloor": "1st",
        "assignedBlock": "A"
    }
    ```
  - If no `admissionId` is provided, returns an array of all student objects.
    ```json
    [
        {
            "admissionId": "101",
            "name": "John Doe",
            "assignedRoom": "A101",
            "assignedFloor": "1st",
            "assignedBlock": "A"
        },
        ...
    ]
    ```
- **Status Codes**:
  - `200 OK`: Students were successfully retrieved.
  - `404 Not Found`: Student does not exist.

### 3. Update a Student's Information

- **Endpoint**: `/students/:admissionId`
- **Method**: `PUT`
- **Description**: Updates the details of an existing student.
- **Path Parameters**:
  - `admissionId`: The Admission ID of the student to update (e.g., `101`).
- **Request Body**:
    ```json
    {
        "name": "Jane Doe"
    }
    ```
- **Response**: Returns the updated student object.
    ```json
    {
        "admissionId": "101",
        "name": "Jane Doe",
        "assignedRoom": "A101",
        "assignedFloor": "1st",
        "assignedBlock": "A"
    }
    ```
- **Status Codes**:
  - `200 OK`: Student was successfully updated.
  - `404 Not Found`: Student does not exist.

### 4. Delete a Student

- **Endpoint**: `/students/:admissionId`
- **Method**: `DELETE`
- **Description**: Deletes an existing student.
- **Path Parameters**:
  - `admissionId`: The Admission ID of the student to delete (e.g., `101`).
- **Response**: Returns a success message.
    ```json
    {
        "message": "Student deleted successfully",
        "student": {
            "admissionId": "101",
            "name": "John Doe",
            "assignedRoom": "A101",
            "assignedFloor": "1st",
            "assignedBlock": "A"
        }
    }
    ```
- **Status Codes**:
  - `200 OK`: Student was successfully deleted.
  - `404 Not Found`: Student does not exist.

### 5. Assign Students to a Room

- **Endpoint**: `/students/assign`
- **Method**: `POST`
- **Description**: Assigns students to a specified room.
- **Request Body**:
    ```json
    {
        "roomName": "A101",
        "admissionIds": "101, 102"
    }
    ```
- **Response**:
  - If the assignment is successful and within room capacity, returns the updated room object with assigned students.
    ```json
    {
        "block": "A",
        "floor": "1st",
        "roomName": "A101",
        "capacity": 10,
        "students": ["101", "102"]
    }
    ```
  - If the room's capacity would be exceeded, returns an error message.
    ```json
    {
        "error": "Cannot assign students. The room capacity is 10 and would be exceeded by this assignment."
    }
    ```
- **Status Codes**:
  - `200 OK`: Students were successfully assigned.
  - `400 Bad Request`: Room capacity would be exceeded or invalid data.
  - `404 Not Found`: Room does not exist.

### 6. Edit Assigned Students in a Room

- **Endpoint**: `/students/edit/:roomName`
- **Method**: `PUT`
- **Description**: Edits the list of students assigned to a specific room.
- **Path Parameters**:
  - `roomName`: The name of the room to edit (e.g., `A101`).
- **Request Body**:
    ```json
    {
        "admissionIds": "103, 104"
    }
    ```
- **Response**: Returns the updated room object with the new list of assigned students.
    ```json
    {
        "block": "A",
        "floor": "1st",
        "roomName": "A101",
        "capacity": 10,
        "students": ["103", "104"]
    }
    ```
- **Status Codes**:
  - `200 OK`: Students were successfully reassigned.
  - `404 Not Found`: Room does not exist.

---

## JSON Data Structure Overview

### Room Object
```json
{
    "block": "A",
    "floor": "1st",
    "roomName": "A101",
    "capacity": 10,
    "students": ["101", "102"]
}
```
### Student Object
```json
{
    "admissionId": "101",
    "name": "John Doe",
    "assignedRoom": "A101",
    "assignedFloor": "1st",
    "assignedBlock": "A"
}
```