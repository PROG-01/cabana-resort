const createApp = require("./app");

const app = createApp(
    'data/map.ascii',
    'data/bookings.json'
);

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});