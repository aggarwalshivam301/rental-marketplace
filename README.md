# RentHub

> A peer-to-peer marketplace for listing, discovering, and booking rentable items.

RentHub is a full-stack MERN application that models a two-sided rental workflow. Owners can publish items and manage requests; renters can browse listings, choose dates, and track booking status.

## Project status

The current branch contains an implemented MVP. The frontend production build and backend health smoke test have been verified locally. A public demo and automated end-to-end suite are not configured in this repository yet.

| Capability | Status |
|---|---|
| User registration and login | Implemented |
| Item listing and management | Implemented |
| Search and filtering | Implemented |
| Booking requests and owner approval | Implemented |
| Protected routes and JWT auth | Implemented |
| Automated backend smoke test | Implemented |
| Public deployment | Not configured in this repository |
| Payments, chat, and notifications | Roadmap |

## Main workflow

```text
Owner creates an item
        ↓
Renter browses and selects dates
        ↓
Renter submits a booking request
        ↓
Owner confirms or declines
        ↓
Both users can track the booking status
```

## Features

- Owner and renter account flows.
- Item listings with descriptions, images, pricing, and availability.
- Browse, search, and category/location filters.
- Booking requests with date selection and status tracking.
- Protected pages for personal items, bookings, and profile information.
- Responsive React interface with loading, empty, and notification states.

## Technology stack

- **Frontend:** React 18, React Router, Axios, React Toastify, date-fns, CSS Grid and Flexbox
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Security:** JWT authentication, bcrypt password hashing, role/ownership checks
- **Testing:** Node’s built-in test runner for the backend health endpoint

## Repository structure

```text
backend-node/
  config/          MongoDB configuration
  controllers/     Auth, item, and booking logic
  middleware/      JWT protection
  models/          User, item, booking, and review schemas
  routes/          Express route definitions
  test/            Backend smoke tests
  server.js        API entrypoint
frontend/
  src/             React pages, components, context, and API client
```

## Local setup

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB, local or hosted

### Backend

```bash
git clone https://github.com/aggarwalshivam301/rental-marketplace.git
cd rental-marketplace/backend-node
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:5000` by default. Verify it with:

```bash
curl http://localhost:5000/health
```

### Frontend

```bash
cd ../frontend
npm install
npm start
```

The development frontend runs on `http://localhost:3000` by default. Set `REACT_APP_API_URL` in `frontend/.env` when the API is not running at the default URL.

## Testing and builds

```bash
cd backend-node
npm test

cd ../frontend
npm run build
```

The backend test is intentionally dependency-light and verifies that the service can expose its health endpoint without requiring a database connection. Add integration tests for authentication and booking transitions as the next testing milestone.

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Service health check |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/items` | Browse items |
| `POST` | `/api/items` | Create an item |
| `POST` | `/api/bookings` | Request a rental |
| `PUT` | `/api/bookings/:id/status` | Confirm or update a booking |

Protected endpoints require `Authorization: Bearer <token>`.

## Security and configuration

Copy `.env.example` to `.env` and provide a local MongoDB URI plus a unique, strong `JWT_SECRET`. Do not commit `.env` files, database credentials, or hosted service keys. Credentials that appeared in earlier public versions should be revoked and rotated before deployment.

## Roadmap

- Add automated authentication and booking integration tests.
- Add a public demo with disposable seed data.
- Add image storage, payments, messaging, and notifications.
- Add explicit overlap-prevention tests for date ranges.
- Add CI checks for dependency installation, tests, and production builds.

## License

MIT

## Contact

- GitHub: [@aggarwalshivam301](https://github.com/aggarwalshivam301)
- Email: [shivaggarwal272@gmail.com](mailto:shivaggarwal272@gmail.com)
