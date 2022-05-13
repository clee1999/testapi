process.env.NODE_ENV = 'test';

const request = require("supertest");
const { app } = require('../app');
const db = require("./db");

const user = {
    lastname: "mouss",
    firstname: "kejler",
    email: "user@gmail.com",
    password: "User555/",
    role: "USER"
}

const admin = {
    lastname: "mouss",
    firstname: "kejler",
    email: "admin@gmail.com",
    password: "Admin555/",
    role: "ADMIN"
}


// Send 200 - Login validé
const validLogin = [
    { email: 'user@gmail.com', password: 'User555/' }, // Test User
    { email: 'admin@gmail.com', password: 'Admin555/' }, // Test Admin
];

// Send 400 - Mauvais format
const invalidFormatLogin = [
    { email: 'moussiamottal@gmail.com' }, // Test invalide, Mot de passe inexistant
    { password: '' }, // Test invalide, Email inexistant et Mot de passe vide
    { email: 'admin@gmail.com', password: '' }, // Test Admin, Mot de passe vide
    { email: '', password: 'dedddfvr' }, // Test Admin, Email inexistant et Mot de passe Invalide
    { email: 'admingmail.com', password: 'ertrt' }, // Test Admin, Email mauvais format et mauvais Mot de passe
    { email: 'admin@gmail.com', password: 'aaa' }, // Test Admin, mauvais Mot de passe
];

// Send 401 - Mauvais identifiants
const badLogin = [
    { email: 'moussiamottal@gmail.com', password: 'oiefheoiej' }, // Mauvais mot de passe  
    { email: 'toto@gmail.com', password: 'oiefheoiej' }, // Mauvais Email et Mauvais mot de passe
]

describe('Users routes', () => {
    beforeAll(async () => {
        await db.connect();
    });
    beforeEach(async () => {
        await request(app).post('/api/users/create').send(user);
        await request(app).post('/api/users/create').send(admin);
    });
    afterEach(async () => await db.clear());
    afterAll(async () => await db.close());

    validLogin.forEach((data, i) => {
        test(`valid logins ${i}`, async () => {
            const res = await request(app).post('/session').send(data);
            expect(res.statusCode).toEqual(200);
        })
    });

    invalidFormatLogin.forEach((data, i) => {
        test(`invalid logins ${i}`, async () => {
            const res = await request(app).post('/session').send(data);
            expect(res.statusCode).toEqual(400);
        })
    });

    badLogin.forEach((data, i) => {
        test(`bad logins ${i}`, async () => {
            const res = await request(app).post('/session').send(data);
            expect(res.statusCode).toEqual(401);
        })
    })
});