# Banking App

A full-stack banking application with authentication, user account management, and transaction features.

## Features

- **User Authentication:** Signup and login functionality using JWT-based authentication.
- **Account Balance:** View available account balance.
- **User Management:** List of all registered users with search functionality.
- **Funds Transfer:** Transfer money to other users via a modal dialog.
- **API Integration:** Backend communication using RESTful APIs.

## Tech Stack

### Frontend:
- React.js (Vite)
- React Router
- Tailwind CSS
- Axios (for API requests)
- React Hot Toast (for notifications)

### Backend:
- Node.js (NestJS Framework)
- MySQL (Aiven for MySQL)
- TypeORM (for database management)
- JWT Authentication

## Installation

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/banking-app.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables in `.env`:
   ```env
   DATABASE_URL=mysql://username:password@host:port/database
   JWT_SECRET=your_jwt_secret
   ```
5. Run the server:
   ```sh
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication
- **Signup:** `POST /api/auth/signup`
- **Signin:** `POST /api/auth/signin`

### User Management
- **Update User Info:** `PUT /api/user/updateinfo`
- **Get Account Balance:** `GET /api/account/balance`
- **Transfer Funds:** `POST /api/account/transfer`

## Usage
- Login with valid credentials.
- View the list of users and search by first or last name.
- Check your account balance.
- Transfer funds to a selected user using the "Transfer" button.

## License
This project is licensed under the MIT License.

