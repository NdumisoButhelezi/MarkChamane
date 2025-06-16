# Mark Chamane Professional Booking Website

A professional booking website for Mark Chamane, featuring user authentication, booking management, and admin dashboard functionality.

## Features

- **User Authentication**: Email/password authentication with role-based access (user/admin)
- **Booking System**: Comprehensive booking form with validation and Firebase integration
- **Admin Dashboard**: Real-time booking management with status updates and detailed views
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live updates using Firebase Firestore

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Testing

Run the automated test suite:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Testing Scenarios

The project includes comprehensive automated tests for two main user scenarios:

### Scenario 1: New User Books Event
- User registration with email/password
- Auto-filled email in booking form
- Form validation (required vs optional fields)
- Successful booking submission
- Firebase integration testing

### Scenario 2: Admin Management
- Admin login and dashboard access
- Booking statistics display
- Status filtering (All, Pending, Confirmed, Cancelled)
- Booking detail modal functionality
- Status updates (confirm/cancel bookings)
- Booking deletion with confirmation

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth)
├── firebase/           # Firebase configuration
├── pages/              # Page components
├── test/               # Test files and utilities
│   ├── components/     # Component tests
│   ├── scenarios/      # End-to-end scenario tests
│   ├── mocks/          # Test mocks
│   └── utils/          # Test utilities
└── types/              # TypeScript type definitions
```

## Firebase Configuration

The project uses Firebase for:
- **Authentication**: Email/password with user roles
- **Firestore**: Real-time database for bookings and user data
- **Security Rules**: Role-based access control

## User Roles

- **User**: Can create bookings and view their own submissions
- **Admin**: Can view all bookings, update statuses, and manage the system

## Key Features

### Booking Form
- Auto-filled email from authenticated user
- Required field validation
- Optional field handling
- Date/time selectors with validation
- Real-time form submission

### Admin Dashboard
- Real-time booking statistics
- Status-based filtering
- Detailed booking modal
- Bulk actions (confirm, cancel, delete)
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is private and proprietary.