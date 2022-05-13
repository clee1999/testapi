process.env.NODE_ENV = 'test';

const request = require("supertest");
const { app } = require('../app');

const validLogin = [
    { email: 'moussiamottal@gmail.com', password: 'Hayamomomo555/' }, // user
    { email: 'admin@gmail.com', password: 'Hayamomomo555/' }, // admin
]

const invalidLogin = [
    { email: 'moussiamottal@gmail.com' }, // 
    { password: '' }, // admin,
    { email: 'admin@gmail.com', password: '' }, // admin
    { email: '', password: 'dedddfvr' }, // admin
    { email: 'admingmail.com', password: '' }, // admin
    { email: 'admin@gmail.com', password: 'aaa' }, // admin
];

const badLogin = [
    { email: 'moussiamottal@gmail.com', password: 'oiefheoiej' }, // 
    { email: 'toto@gmail.com', password: 'oiefheoiej' }, // 
]

describe('Users routes', () => {
    validLogin.forEach((data, i) => {
        test('valid logins', async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send({ email, password });
            expect(res.statusCode).toEqual(200);
        })
    });

    invalidLogin.forEach((data) => {
        test('Invalid logins', async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send({ email, password });
            expect(res.statusCode).toEqual(400);
        })
    })
});