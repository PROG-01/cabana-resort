const request = require("supertest");
const createApp = require("../app");

const app = createApp(
    "data/map.ascii",
    "data/bookings.json"
);

describe("GET /api/map", function () {

    test("should return the resort map", async function () {

        const response = await request(app).get("/api/map");

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBeGreaterThan(0);

    });

});

describe("POST /api/book", function () {

    test("should successfully book a cabana", async function () {

        const response = await request(app)
            .post("/api/book")
            .send({
                row: 10,
                col: 10,
                room: "101",
                guestName: "Alice Smith"
            });

        expect(response.status).toBe(200);

        expect(response.text).toBe("Cabana booked successfully!");

    });

    test("should reject an invalid guest", async function () {

    const response = await request(app)
        .post("/api/book")
        .send({
            row: 5,
            col: 5,
            room: "999",
            guestName: "Unknown Guest"
        });

    expect(response.status).toBe(400);

    expect(response.text).toBe("Invalid room number or guest name");

});

test("should reject booking an already booked cabana", async function () {

    const response = await request(app)
        .post("/api/book")
        .send({
            row: 10,
            col: 10,
            room: "101",
            guestName: "Alice Smith"
        });

    expect(response.status).toBe(400);

    expect(response.text).toBe("This cabana is already booked");

});

});