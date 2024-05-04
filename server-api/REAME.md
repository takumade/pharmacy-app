# Pharmacy App Server

## Description
This is a Pharmacy App that allows pharmacies to register, list medicines, and users to register and buy medicines, both prescription and over-the-counter.

## Getting Started
To get started with the app, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables such as database connection string, JWT secret, etc.
  
        `PORT=3000`

        `MONGODB_URI=<URI HERE>`
        
        `SECRET_KEY=<SECRET HERE>`
4. Seed the database using `npm run seed` (optional).
5. Run the app in development mode using `npm run dev`.
6. Access the app in your browser at `http://localhost:PORT` where PORT is the port configured in your `.env` file.

## Scripts
- `npm start`: Start the server.
- `npm run dev`: Start the server in development mode with nodemon for automatic restarts.
- `npm test`: Run tests using Jest.
- `npm run seed`: Seed the database with initial data.
