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

describe('', () => {
    invalidLogin.forEach((data) => {
        test('', () => {
            request()
        })
    })
});