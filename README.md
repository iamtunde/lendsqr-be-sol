<!-- @format -->

# Wallet Service API

This is a **Node.js** application that manages wallet functionalities, including wallet creation, transactions, and balance lookups.

## Table of Contents

- [Project Setup](#project-setup)
- [ER Diagram](https://dbdesigner.page.link/Q3YdeSbRgBUhgP3V7)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)

## Project Setup

To get started, follow these instructions:

1. Clone the repository:

   ```bash
   git clone git@github.com:iamtunde/lendsqr-be-sol.git
   cd lendsqr-be-sol/

   ```

2. Install project dependencies:

   ```bash
   npm install

   ```

3. Copy the .env.example file to .env and update the environment variables with your configuration:

   ```bash
   cp .env.example .env

   ```

4. Set up the environment variables in the .env
   - `DB_HOST`: Database host URL
   - `DB_PORT`: Database port
   - `DB_USER`: Database username
   - `DB_PASSWORD`: Database password
   - `DB_NAME`: Database name
   - `JWT_SECRET`: Your secret key for JWT
   - `ENCRYPTION_KEY`: Your JWT encryption key

## Database Setup

To configure the database, ensure you already have mysql installed, you can also run the project on mariadb server.

Then sign in to your mysql server

```bash
mysql -u root -p
```

Type in your password at the prompt and hit ENTER

1. Create a database:

   ```bash
   CREATE DATABASE wallet_service_db;

   ```

2. Run migration from the project root:

   ```bash
   > npm run db:migrate

   ```

3. Run database seed to quickly get started:
   ```bash
   > npm run db:seed
   ```

## Running the Application

1. Start the application in development mode:

   ```
   > npm run dev

   ```

2. To run the application in production mode:
   ```
   > npm run build && npm run start
   ```

The application will be running on http://localhost:[PORT], where [PORT] is defined in the .env file or defaults to 3000.

## Running Tests

This project uses Jest for testing.

1. To run the tests:

   ```bash
   > npm run test

   ```

2. To run tests in watch mode (useful during development):
   ```bash
   > npm run test:watch
   ```

### Troubleshooting

If the application crashes or fails to start, make sure to check:

- **Database Connection**: Ensure your database is running and the connection details are correct in your .env file.

- **Migrations**: Ensure that all database migrations have been applied correctly.

- **Environment Variables**: Double-check that all required environment variables are correctly set in the .env file.

### License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

### Summary

- **Project Setup**: Covers steps for cloning the repository, installing dependencies, and setting environment variables.
- **Database Setup**: Includes instructions on setting up PostgreSQL and running migrations.
- **Running the Application**: Shows how to run the application in both development and production modes.
- **Running Tests**: Details commands for testing using Jest.
- **Troubleshooting**: Provides common solutions for potential issues.
