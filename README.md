# Cabana Resort Booking System

A simple full-stack booking application built with Node.js, Express, HTML, CSS, and JavaScript.

The application allows hotel guests to reserve pool cabanas after validating their hotel booking.

---

## Features

- Display resort map from an ASCII map file
- Render the resort map in the browser
- Select available cabanas
- Validate hotel room number and guest name
- Prevent double booking
- Visual indication of booked cabanas
- Booking modal interface
- Success and error notifications
- Automated backend API tests
- Automated frontend UI tests

---

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

---

## Project Structure

```
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
├── package.json
└── README.md
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Open:

```
http://localhost:3000
```

---

## Running Tests

### Backend API Tests

```bash
npm test
```

### Frontend UI Tests

```bash
npm run test:e2e
```

---

## API Endpoints

### GET

```
GET /api/map
```

Returns the ASCII resort map.

---

```
GET /api/bookings
```

Returns hotel booking data.

---

```
GET /api/cabana-bookings
```

Returns booked cabanas.

---

### POST

```
POST /api/book
```

Books a cabana after validating:

- room number
- guest name

Returns:

- success
- invalid guest
- already booked

---

```
POST /api/reset
```

Used only during automated Playwright tests to reset the in-memory cabana booking state between tests.

---

## Assumptions

- Hotel bookings are loaded from `bookings.json`.
- Cabana bookings are stored in memory.
- Restarting the server clears cabana bookings.
- The resort map is loaded from `map.ascii`.

---

## Notes

This project intentionally keeps the architecture simple to match the scope of the assignment while focusing on readability, maintainability, and automated testing. Developed as part of a Junior Software Engineer technical assessment.