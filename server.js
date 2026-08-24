const createApp = require("./app");

const mapIndex = process.argv.indexOf('--map');
const bookingsIndex = process.argv.indexOf('--bookings');

if (mapIndex === -1 || bookingsIndex === -1) {
    console.error('Usage: node server.js --map <map-file> --bookings <bookings-file>');
    process.exit(1);
}

const mapPath = process.argv[mapIndex + 1];
const bookingsPath = process.argv[bookingsIndex + 1];

const app = createApp(mapPath, bookingsPath);

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});