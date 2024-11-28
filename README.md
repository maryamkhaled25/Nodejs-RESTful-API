"# Nodejs-RESTful-API" 

//========= Node.js RESTful API for Students, Courses, and Departments ==============
A lightweight and efficient RESTful API built with Node.js for managing students, courses, and departments. This project demonstrates core backend concepts, including CRUD operations, file-based storage, and data relationships.

-----------------------------------------------------------

Features:

1- Students
Get all students.
Get a student by ID.
Add, update, and delete students.
Retrieve student details along with department and enrolled courses.


2-Courses
Get all courses.
Get a course by ID.
Add, update, and delete courses.


3-Departments
Get all departments.
Get a department by ID.
Add, update, and delete departments.

--------------------------------------------------------

Technologies Used:
1-Node.js: For building the server.
2-HTTP Module: To handle server requests and responses.
3-File System (fs) Module: For data persistence using JSON files.

--------------------------------------------------------------

Instructions:

The server will run on http://localhost:3000.

--------------------------------------------------------------

API Endpoints:

//-------------------- Students -------------------------
GET /students - Retrieve all students.
GET /students/:id - Get student by ID.
POST /students - Add a new student.
PUT /students/:id - Update a student by ID.
DELETE /students/:id - Delete a student by ID.

//-------------------- Courses ---------------------------
GET /courses - Retrieve all courses.
GET /courses/:id - Get course by ID.
POST /courses - Add a new course.
PUT /courses/:id - Update a course by ID.
DELETE /courses/:id - Delete a course by ID.

//-------------------- Departments -----------------------
GET /departments - Retrieve all departments.
GET /departments/:id - Get department by ID.
POST /departments - Add a new department.
PUT /departments/:id - Update a department by ID.
DELETE /departments/:id - Delete a department by ID.
