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
 *
 * afterEach(async () => await server.clearDatabase()); 
 */

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.clearDatabase();
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
        const response = await request(app).post('/api/user/friends').send({URL}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        const results = response.body.sort(result => result.nombre);
        expect(results[0].nombre).toBe("Moises ");
        expect(results[0].latitud).toBe(43.5405559);
        expect(results[0].longitud).toBe(-5.7009505);
        expect(results[0].altitud).toBe(50.0);
        expect(results[1].nombre).toBe("Alberto");
        expect(results[1].latitud).toBe(43.3656691);
        expect(results[1].longitud).toBe(-5.8546573);
        expect(results[1].altitud).toBe(100.0);
    });

    /**
     * Test that we can list friends that are near a location.
     */
    it('near a location can be listed',async () => {
        let URL = "https://davidaf.solidcommunity.net/profile/card#me";
        let latitud = 43.54;
        let longitud = -5.70;
        let maxDistancia = 100;
        const response = await request(app).post('/api/user/friends/near')
            .send({URL, latitud, longitud, maxDistancia})
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        const results = response.body.sort(result => result.nombre);
        expect(results[0].nombre).toBe("Moises ");
        expect(results[0].latitud).toBe(43.5405559);
        expect(results[0].longitud).toBe(-5.7009505);
        expect(results[0].altitud).toBe(50.0);
    });
});

describe('users ', () => {
    /**
     * Tests that a user with his location can be created without throwing any errors.
     */
    it('can be created correctly', async () => {
        username = 'Pablo'
        email = 'pablo@uniovi.es'
        const response = await request(app).post('/api/user/add')
            .send({
                URL: "https://prueba.solidcommunity.net/profile/card#me",
                latitud: 43.3656691,
                longitud: -5.8546573,
                altitud: 100.0})
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Update successful");
    });

    /**
     * Tests that an existing user with his location can be updated.
     */
     it('can be updated correctly', async () => {
        username = 'Pablo'
        email = 'pablo@uniovi.es'
        const response = await request(app).post('/api/user/add')
            .send({
                URL: "https://prueba.solidcommunity.net/profile/card#me",
                latitud: 43.00,
                longitud: -5.00,
                altitud: 120.0})
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Update successful");
    });
});