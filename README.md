# Full-Stack Authentication & Profile Application

This project is a full-stack solution demonstrating authentication and profile management using a Flask backend and a Next.js frontend. The application has been containerized with Docker Compose for easy setup and deployment.

## Overview

- **Landing Page (Login):** The root URL (http://localhost:3000) is the login page.
- **Register Page:** Accessible via `/register`.
- **Profile Page:** Accessible via `/profile` (protected route).

The backend provides JWT-based authentication and profile endpoints, and the frontend handles login, registration, and protected routing. All services (backend, frontend, and PostgreSQL database) are managed via Docker Compose.

## Features

- **Authentication:** Register and log in with secure JWT-based authentication.
- **Profile Management:** View your profile on the protected `/profile` page.
- **Dockerized Setup:** Run the entire application stack using Docker Compose.
- **Environment Configuration:** A single `.env` file holds all configuration secrets and endpoints.

## Environment Variables

The project uses a `.env` file (located at the root of the repository) to store environment variables. An example `.env` file is shown below:

```dotenv
SECRET_KEY=roisoq/zPOgd+9p6ylgB4Xs1+IAZuECO5FotHDnT050=
COOKIE_SECRET_KEY=oTQih2MHChWYuY5f6Kke7fqLKrVG3vZp
NEXT_PUBLIC_API_URL=http://backend:5000
JWT_SECRET_KEY=uF5rNxyen5Vm0YjBd8y8a1_QlNjC9iZyeOJmXJNUdeQ
DEBUG=True
DATABASE_URL=postgresql://tech:IAZuECO5FotHDnT050@db:5432/profile
db=profile
user=tech
password=IAZuECO5FotHDnT050
ALLOWED_CORS=['http://frontend:3000']
```

---

This README provides a clear overview of the project, instructions for setting up and running the application, and details about the environment variables used.
