const request = require('supertest');
const server = require('./server-for-tests')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb()
    app = await server.startserver()
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await server.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer() //finish the server
    await server.closeDB()
})

/**
 * Product test suite.
 */
describe('friends ', () => {
    /**
     * Test that we can list friends without any error.
     */
    it('can be listed',async () => {
        await request(app).get("/api/user/sample"); // add sample data
        let URL = "https://davidaf.solidcommunity.net/profile/card#me";
        const response = await request(app).post('/api/user/friends').send({URL: URL}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        const results = response.body.sort(result => result.nombre);
        expect(results[0].nombre).toBe("Timothy Berners-Lee");
        expect(results[0].latitud).toBe(43.3656691);
        expect(results[0].longitud).toBe(-5.8546573);
        expect(results[0].altitud).toBe(100.0);
        expect(results[1].nombre).toBe("Ruben Verborgh");
        expect(results[1].latitud).toBe(43.5405559);
        expect(results[1].longitud).toBe(-5.7009505);
        expect(results[1].altitud).toBe(50.0);
    });

    /**
     * Tests that a user with his location can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        username = 'Pablo'
        email = 'pablo@uniovi.es'
        const response = await request(app).post('/api/user/add')
            .send({
                URL: "https://davidaf.solidcommunity.net/profile/card#me",
                latitud: 43.3656691,
                longitud: -5.8546573,
                altitud: 100.0})
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.URL).toBe("https://davidaf.solidcommunity.net/profile/card#me");
        expect(response.body.latitud).toBe(43.3656691);
        expect(response.body.longitud).toBe(-5.8546573);
        expect(response.body.altitud).toBe(100.0);
    });
});