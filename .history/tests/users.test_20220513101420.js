process.env.NODE_ENV = 'test';

const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require('../app');

const validLogin = [
    { email: 'moussiamottal@gmail.com', password: 'Hayamomomo555/' }, // user
    { email: 'admin@gmail.com', password: 'Hayamomomo555/' }, // admin
]

// Send 400
const invalidLogin = [
    { email: 'moussiamottal@gmail.com' }, // Test invalide, Mot de passe inexistant
    { password: '' }, // Test invalide, Email inexistant et Mot de passe vide
    { email: 'admin@gmail.com', password: '' }, // Test Admin, Mot de passe vide
    { email: '', password: 'dedddfvr' }, // Test Admin, Email inexistant et Mot de passe Invalide
    { email: 'admingmail.com', password: 'ertrt' }, // Test Admin, Email mauvais format et mauvais Mot de passe
    { email: 'admin@gmail.com', password: 'aaa' }, // Test Admin, mauvais Mot de passe
];

const badLogin = [
    { email: 'moussiamottal@gmail.com', password: 'oiefheoiej' }, // 
    { email: 'toto@gmail.com', password: 'oiefheoiej' }, // 
]

describe('Users routes', () => {
    validLogin.forEach((data, i) => {
        test(`valid logins ${i}`, async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send({ email, password });
            expect(res.statusCode).toEqual(200);
        })
    });

    invalidLogin.forEach((data, i) => {
        test(`invalid logins ${i}`, async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send({ email, password });
            expect(res.statusCode).toEqual(400);
        })
    });

    badLogin.forEach((data, i) => {
        test(`bad logins ${i}`, async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send({ email, password });
            expect(res.statusCode).toEqual(401);
        })
    })

    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        await mongoose.connection.close();
    })
});