# Cabana Resort Booking System

A simple full-stack booking application built with Node.js, Express, HTML, CSS, and vanilla JavaScript.

The application allows hotel guests to reserve available pool cabanas after validating their room number and guest name against existing hotel bookings.

## Features

- Loads a resort map from an ASCII file
- Dynamically renders the resort map in the browser
- Allows guests to select available cabanas
- Validates room number and guest name on the server
- Validates cabana coordinates on the server
- Prevents double booking
- Displays booked cabanas visually
- Preserves booking state across browser refreshes while the server is running
- Resets bookings when the server restarts
- Uses a booking modal instead of browser prompts
- Displays success and error notifications
- Protects guest information from public API responses
- Automated backend API tests
- Automated frontend end-to-end tests

## Tech Stack

### Backend

- Node.js
- Express

### Frontend

- HTML
- CSS
- Vanilla JavaScript

### Testing

- Jest
- Supertest
- Playwright

## Project Structure

```text
cabana-resort/
│
├── data/
│   ├── bookings.json
│   └── map.ascii
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── e2e/
│   └── booking.spec.js
│
├── tests/
│   └── app.test.js
│
├── app.js
├── server.js
├── playwright.config.js
├── package.json
└── README.md
```

## Installation

Install the dependencies:

```bash
npm install
```

## Running the Application

The application requires paths to the resort map and hotel bookings files.

Run:

```bash
node server.js --map data/map.ascii --bookings data/bookings.json
```

Alternatively, using npm:

```bash
npm start -- --map data/map.ascii --bookings data/bookings.json
```

Then open:

```text
http://localhost:3000
```

If the required command-line arguments are missing, the application displays the expected usage:

```text
Usage: node server.js --map <map-file> --bookings <bookings-file>
```

## API Endpoints

### GET `/api/map`

Returns the resort map as an array of rows.

### GET `/api/cabana-bookings`

Returns only the coordinates of currently booked cabanas.

Example:

```json
[
    {
        "row": 11,
        "col": 11
    }
]
```

Room numbers and guest names are intentionally not returned by this endpoint.

### POST `/api/book`

Attempts to reserve a cabana.

The request contains:

```json
{
    "row": 11,
    "col": 11,
    "room": "101",
    "guestName": "Alice Smith"
}
```

The server verifies that:

- the room number and guest name correspond to an existing hotel booking
- the supplied coordinates represent a cabana on the resort map
- the cabana has not already been booked

The server returns an appropriate success or error response.

### POST `/api/reset`

This endpoint exists **only in the test environment**.

It is used by automated tests to reset the in-memory cabana booking state between tests.

It is not registered when the application runs normally.

## Testing

### Backend API Tests

Run:

```bash
npm test
```

The backend test suite covers key behavior including:

- loading the resort map
- successful cabana booking
- invalid guest validation
- rejection of non-cabana coordinates
- prevention of duplicate bookings
- ensuring the public cabana-bookings endpoint does not expose room numbers or guest names

### Frontend End-to-End Tests

Run:

```bash
npm run test:e2e
```

The Playwright tests cover:

- loading the application
- opening the booking modal
- successfully booking a cabana
- displaying an error for invalid guest details
- retaining the booked visual state after a page refresh

## Data and Privacy

Hotel booking information is loaded from the bookings file supplied through the `--bookings` command-line option.

The hotel guest list remains private to the backend and is used only to validate booking requests. It is not published through a public API endpoint.

The frontend receives only the row and column coordinates required to identify already-booked cabanas.

## Booking Storage

Cabana bookings are intentionally stored in memory.

This follows the scope of the assignment, which does not require persistent storage.

As a result:

- bookings remain available while the server is running
- refreshing the browser does not clear bookings
- restarting the server clears all cabana bookings

## Assumptions

- `W` in the ASCII map represents a bookable cabana.
- Hotel guests are validated using the supplied room number and guest name.
- Only one booking may exist for a cabana at a time.
- Persistent cabana-booking storage is outside the required scope.

## Design Notes

The project intentionally uses a small architecture appropriate to the scope of the assignment.

`server.js` handles command-line configuration and starts the server.

`app.js` creates the Express application, loads the supplied data files, performs backend validation, and manages in-memory cabana bookings.

The browser handles map rendering and user interaction, while security-sensitive validation remains on the server.

Automated tests cover both API behavior and key browser workflows.

Developed as part of a Junior Software Engineer technical assessment.