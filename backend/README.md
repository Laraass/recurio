# Recurio - Backend

## Technologies

- Fastify (TypeScript)
- MongoDB with Mongoose
- JWT authentication
- Email sending via [Nodemailer](https://nodemailer.com/)

## Setup

1. ``cd backend``
2. ``npm install``
3. Create **.env** file with:

    ```env
    MONGO_URI=<your-mongo-db-url>
    PORT=3000
    JWT_SECRET=<your-jwt-secret>
    ADMIN_USER=<email-used-for-nodemailer>
    ADMIN_PASS=<app-password-for-nodemailer>
    ```

4. Run dev server: ``npm run dev``

## Structure

- ``models/`` - Mongoose models
- ``controllers/`` - Functions for routes
- ``routes/`` - Fastify route definitions
- ``middleware/`` - JWT authentication and admin verification
- ``data/`` - Static subscription data and seeding script
- ``plugins/`` - MongoDB connection setup
- ``utils/`` - Nodemailer setup
- ``index.ts`` - Main server file where Fastify is initialized and routes are registered

## Notes

- Axios requests from the frontend include the JWT token, which the backend verifies via ``auth`` middleware.
- Admin endpoints require ``verifyAdmin`` middleware.
- Users and subscriptions are stored in MongoDB, and emails are sent via Nodemailer.
