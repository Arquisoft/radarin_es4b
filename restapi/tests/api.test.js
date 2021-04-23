const request = require('supertest');
const server = require('./server-for-tests');

const jwt = require("jsonwebtoken");
const token = jwt.sign(
    { webId: "https://davidaf.solidcommunity.net/profile/card#me" },
    process.env.TOKEN_SECRET || "contraseñapruebas"
  );

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
    await server.closeServer(); //finish the server
    await server.closeDB();
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
        expect(results[0].nombre).toBe("moises");
        expect(results[0].latitud).toBe(43.5405559);
        expect(results[0].longitud).toBe(-5.7009505);
        expect(results[0].altitud).toBe(50.0);
        expect(new Date(results[0].fecha)).toStrictEqual(new Date(1000));
        expect(results[1].nombre).toBe("Alberto");
        expect(results[1].latitud).toBe(43.3656691);
        expect(results[1].longitud).toBe(-5.8546573);
        expect(results[1].altitud).toBe(100.0);
        expect(new Date(results[1].fecha)).toStrictEqual(new Date(1000));
    });

    /**
     * Test that we can list friends that are near a location.
     */
    it('near a location can be listed',async () => {
        let latitud = 43.54;
        let longitud = -5.70;
        let maxDistancia = 100;
        const response = await request(app).post('/api/user/friends/near')
            .send({token, latitud, longitud, maxDistancia})
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        const results = response.body.sort(result => result.nombre);
        expect(results[0].nombre).toBe("moises");
        expect(results[0].latitud).toBe(43.5405559);
        expect(results[0].longitud).toBe(-5.7009505);
        expect(results[0].altitud).toBe(50.0);
        expect(results[0].distancia).toBeLessThan(100);
        expect(new Date(results[0].fecha)).toStrictEqual(new Date(1000));
    });

    it('near a location cant be listed by unauthorized users',async () => {
        let latitud = 43.51;
        let longitud = -5.73;
        let maxDistancia = 120;
        const response = await request(app).post('/api/user/friends/near')
            .send({token: "123assda123tokenInventado", latitud, longitud, maxDistancia})
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(403);
        expect(response.text).toBe("Invalid or missing token");
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
                token,
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
                token,
                latitud: 43.00,
                longitud: -5.00,
                altitud: 120.0})
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Update successful");
    });

    /**
     * Tests that an existing user with his location can be updated.
     */
     it('unauthorized cant be updated correctly', async () => {
        username = 'Pablo'
        email = 'pablo@uniovi.es'
        const response = await request(app).post('/api/user/add')
            .send({
                token: "tokenInventado1zx232xsds",
                latitud: 43.23,
                longitud: -5.12,
                altitud: 140.0})
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(403);
        expect(response.text).toBe("Invalid or missing token");
    });
});