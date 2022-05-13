process.env.NODE_ENV = 'test';

const request = require("supertest");
const { app } = require('../app');

const validLogin = [
    { email: 'moussiamottal@gmail.com', password: '' }, // user
    { email: 'admin@gmail.com', password: '' }, // admin
]

const invalidLogin = [
    { email: 'moussiamottal@gmail.com' }, // 
    { password: '' }, // admin,
    { email: 'admin@gmail.com', password: '' }, // admin
    { email: '', password: 'dedddfvr' }, // admin
    { email: 'admingmail.com', password: '' }, // admin
    { email: 'admin@gmail.com', password: 'aaa' }, // admin
]

describe('Users routes', () => {
    validLogin.forEach((data) => {
        test('Invalid logins', async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send(email, password);
            expect(res.statusCode).toEqual(401);
        })
    })
    invalidLogin.forEach((data) => {
        test('Invalid logins', async () => {
            const { email, password } = data;
            const res = await request(app).post('/session').send(email, password);
            expect(res.statusCode).toEqual(401);
        })
    })
});