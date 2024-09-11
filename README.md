## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Routes

#### 1. Register

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "userPassword123"
  }
  ```
- **Response**:
  - **Success**: `201 Created`
  - **Failure**: `400 Bad Request` (for validation errors)

#### 2. Login

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Log in a user and receive a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userPassword123"
  }
  ```
- **Response**:
  - **Success**: `200 OK` (includes JWT token)
  - **Failure**: `401 Unauthorized` (for incorrect credentials)

#### 3. Forgot Password

- **Endpoint**: `/auth/forgot-password`
- **Method**: `POST`
- **Description**: Request a password reset link.
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  - **Success**: `200 OK` (confirmation message)
  - **Failure**: `404 Not Found` (if email not registered)

#### 4. Reset Password

- **Endpoint**: `/auth/reset-password`
- **Method**: `POST`
- **Description**: Reset the user's password using a reset token.
- **Request Body**:
  ```json
  {
    "token": "resetTokenHere",
    "newPassword": "newPassword123"
  }
  ```
- **Response**:
  - **Success**: `200 OK` (password reset confirmation)
  - **Failure**: `400 Bad Request` (for invalid token or other issues)

### User Management Routes

#### 1. Get All Users

- **Endpoint**: `/users`
- **Method**: `GET`
- **Description**: Retrieve a list of all users (admin only).
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (list of users)
  - **Failure**: `403 Forbidden` (if not admin)

#### 2. Get User by ID

- **Endpoint**: `/users/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific user by ID (admin only).
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (user details)
  - **Failure**: `403 Forbidden` (if not admin) or `404 Not Found` (if user does not exist)

#### 3. Delete User

- **Endpoint**: `/users/delete/:id`
- **Method**: `DELETE`
- **Description**: Delete a user by ID (self or admin).
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (user deleted)
  - **Failure**: `403 Forbidden` (if not authorized) or `404 Not Found` (if user does not exist)

#### 4. Update User

- **Endpoint**: `/users/update`
- **Method**: `PUT`
- **Description**: Update user details (self only).
- **Headers**:
  - `x-auth-token`: JWT token
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
  ```
- **Response**:
  - **Success**: `200 OK` (user updated)
  - **Failure**: `400 Bad Request` (for validation errors) or `403 Forbidden` (if not authorized)

### Email Routes

#### 1. Send Email

- **Endpoint**: `/email/send`
- **Method**: `POST`
- **Description**: Send an email with optional attachments.
- **Headers**:
  - `x-auth-token`: JWT token
- **Body** (form-data):
  - `to`: Recipient's email
  - `subject`: Email subject
  - `text`: Email body
  - `attachment`: (optional) File to attach
- **Response**:
  - **Success**: `200 OK` (email sent)
  - **Failure**: `500 Internal Server Error` (if email sending fails)

### Project Routes

#### 1. Get All Projects

- **Endpoint**: `/projects`
- **Method**: `GET`
- **Description**: Retrieve all projects (admin only).
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (list of projects)
  - **Failure**: `403 Forbidden` (if not admin)

#### 2. Get Project by ID

- **Endpoint**: `/projects/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific project by ID.
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (project details)
  - **Failure**: `404 Not Found` (if project does not exist)

#### 3. Create Project

- **Endpoint**: `/projects`
- **Method**: `POST`
- **Description**: Create a new project.
- **Headers**:
  - `x-auth-token`: JWT token
- **Request Body**:
  ```json
  {
    "name": "Project Name",
    "description": "Project Description"
  }
  ```
- **Response**:
  - **Success**: `201 Created` (project created)
  - **Failure**: `400 Bad Request` (for validation errors)

#### 4. Update Project

- **Endpoint**: `/projects/:id`
- **Method**: `PUT`
- **Description**: Update a project by ID.
- **Headers**:
  - `x-auth-token`: JWT token
- **Request Body**:
  ```json
  {
    "name": "Updated Project Name",
    "description": "Updated Description"
  }
  ```
- **Response**:
  - **Success**: `200 OK` (project updated)
  - **Failure**: `400 Bad Request` (for validation errors) or `404 Not Found` (if project does not exist)

#### 5. Delete Project

- **Endpoint**: `/projects/:id`
- **Method**: `DELETE`
- **Description**: Delete a project by ID.
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (project deleted)
  - **Failure**: `404 Not Found` (if project does not exist)

### Dashboard Routes

#### 1. Get Dashboard Data

- **Endpoint**: `/dashboard`
- **Method**: `GET`
- **Description**: Retrieve user-specific dashboard data.
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  - **Success**: `200 OK` (dashboard data including project count, email count, etc.)
  - **Failure**: `500 Internal Server Error` (if there is an issue)

---

## User Documentation

### User Registration

- **Description**: Users can register by providing their name, email, and password. On successful registration, a confirmation email may be sent, and the user can then log in to the application.

### User Login

- **Description**: Users can log in with their email and password. Upon successful login, a JWT token is provided for authenticated requests.

### Forgot Password

- **Description**: Users can request a password reset link to be sent to their email. This link allows users to reset their password.

### Reset Password

- **Description**: Users can reset their password using the reset token received via email. This requires submitting the new password along with the token.

### User Management

- **Admin**: Admins have the ability to view all users, get details of specific users, and delete users.

- **Self**: Users can update their own details and delete their own account.

### Email Management

- **Description**: Users can send emails with optional attachments. The email is sent via the configured SMTP server.

### Project Management

- **Description**: Users can manage projects by creating, updating, deleting, and viewing projects. Admins can view all projects, while users can only manage their own.

### Dashboard

- **Description**: Users can view a dashboard that includes statistics such as the number of projects and emails associated with their account.

---
