const request = require("supertest");

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
    invalidLogin.forEach((data) => {
        test('Invalids', () => {
            const { email, password } = data;
            request(App).post('/session').send(email, password);
        })
    })
});