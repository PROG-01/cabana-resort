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

    beforeEach(async function(){
        await request(app).post("/api/reset");
    });

    test("should successfully book a cabana", async function () {

        const response = await request(app)
            .post("/api/book")
            .send({
                row: 11,
                col: 11,
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

test("should reject booking a non-cabana location", async function() {
    const response = await request(app)
    .post("/api/book")
    .send({
        row: 0,
        col: 0,
        room: "101",
        guestName: "Alice Smith"
    });

    expect(response.status).toBe(400);
    expect (response.text).toBe("Invalid cabana location");
});

test("should reject booking an already booked cabana", async function () {

    await request(app)
        .post("/api/book")
        .send({
            row: 11,
            col: 11,
            room: "101",
            guestName: "Alice Smith"
        });

    const response = await request(app)
        .post("/api/book")
        .send({
            row: 11,
            col: 11,
            room: "101",
            guestName: "Alice Smith"
        });    

    expect(response.status).toBe(400);

    expect(response.text).toBe("This cabana is already booked");

});

test("should expose only booked cabana coordinates", async function () {

    const bookingResponse = await request(app)
        .post("/api/book")
        .send({
            row: 11,
            col: 11,
            room: "101",
            guestName: "Alice Smith"
        });

    expect(bookingResponse.status).toBe(200);    

    const response = await request(app)    
        .get("/api/cabana-bookings");    

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);

    expect(response.body[0]).toEqual({
        row: 11,
        col: 11
    });

    expect(response.body[0]).not.toHaveProperty("room");
    expect(response.body[0]).not.toHaveProperty("guestName");
});

});