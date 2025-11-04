# Recurio - Frontend

## Technologies

- React + TypeScript
- Vite
- Tailwind CSS
- Axios with JWT interceptor

## Setup

1. ``cd frontend``
2. ``npm install``
3. Create **.env** file with:

    ```env
    VITE_BASE_URL=http://localhost:3000
    ```

4. Run dev server: ``npm run dev``

## Structure

- ``components/`` - UI components
- ``pages/`` - Pages
- ``api/axios.ts`` - Axios instance with JWT authentication header

## Notes

- Axios automatically sends JWT token in ``Authorization`` header
- Frontend communicates with backend via REST endpoints
