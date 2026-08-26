const fs = require('fs');

const express = require('express');

function createApp(mapPath, bookingsPath) {
    const app = express();

    const bookings = JSON.parse(
    fs.readFileSync(bookingsPath, "utf8")
);

const mapData = fs.readFileSync(mapPath, 'utf8').trim().split('\n');

const cabanaBookings = [];

// Middleware 
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/api/map', function(req, res){
    res.json(mapData);
});

app.get('/api/cabana-bookings', function(req, res) {
    const bookedCoordinates = cabanaBookings.map(function(booking) {
        return {
            row: booking.row,
            col: booking.col
        };
    });
    res.json(bookedCoordinates);
});

app.post('/api/book', function(req, res){
    const { row, col, room, guestName } = req.body;

    const guest = bookings.find(function(booking){
        return booking.room === room && booking.guestName === guestName;
    });

    if (!guest) {
        return res.status(400).send('Invalid room number or guest name');
    };

    if (!mapData[row] || mapData[row][col] !== "W") {
        return res.status(400).send("Invalid cabana location");
    };

    const existingBooking = cabanaBookings.find(function(booking){
        return booking.row === row && booking.col === col;
    });

    if (existingBooking) {
        return res.status(400).send('This cabana is already booked');
    }

    cabanaBookings.push({
        row,
        col,
        room,
        guestName
    });

    res.send('Cabana booked successfully!');
});


// Test-only route used by Playwright to reset
// in-memory cabana bookings between tests.
app.post("/api/reset", function (req, res) {

    cabanaBookings.length = 0;

    res.sendStatus(200);

});

return app;
}

module.exports = createApp;