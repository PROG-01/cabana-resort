const fs = require('fs');

const express = require('express');

const app = express();

const bookings = JSON.parse(
    fs.readFileSync("data/bookings.json", "utf8")
);

const mapData = fs.readFileSync('data/map.ascii', 'utf8').trim().split('\n');

const cabanaBookings = [];

console.log(bookings);

const PORT = 3000;

// Middleware 
app.use(express.static('public'));
app.use(express.json());

// routes
app.get('/api/map', function(req, res){
    res.json(mapData);
});

app.get("/api/bookings", function(req, res){
    res.json(bookings);
});

app.post('/api/book', function(req, res){
    const { row, col, room, guestName} = req.body;

    const guest = bookings.find(function(booking){
        return booking.room === room && booking.guestName === guestName;
    });

    if (!guest){
        return res.status(400).send('Invalid room number or guest name');
    };

    const existingBooking = cabanaBookings.find(function(booking){
        return booking.row === row && booking.col === col;
    });

    if(existingBooking){
        return res.status(400).send('This cabana is already booked');
    }

        cabanaBookings.push({
            row,
            col,
            room,
            guestName
        });

    console.log(cabanaBookings);
    
    res.send('Cabana booked successfully!');
})

app.listen(PORT, function(){
    console.log(`Server running at http://localhost:${PORT}`);
});