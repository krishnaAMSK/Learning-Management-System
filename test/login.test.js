const axios = require('axios');
const { expect } = require('chai');
const assert = require('assert');

const base_URL = "http://localhost:8000"

describe('Testing Login API', ()=>{
    // TestCase1: For login user
    it('Login new user', async() => {
        const userDetails = {
            username: "testUser1",
            password: "1234"
        }

        const response = await axios.post(`${base_URL}/login`, userDetails);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.message, "Logged in and cookie set successfully. But please verify your email.");
    })

    // TestCase2: Testing for invalid credentials
    it('Invalid credentials', async() => {
        const userDetails = {
            username: "testUser1",
            password: "12345678"
        }

        const response = await axios.post(`${base_URL}/login`, userDetails);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.message, "Invalid Credentials.");
    })

    //Test Case3: Leaving an parameter empty
    it('Creating 400 error by missing few parameters', async() => {
        const userDetails = {
            username: "testUser2",
        }
        try {
            await axios.post(`${base_URL}/login`, userDetails);
            expect.fail('Expected to throw an error with status 400');
        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
    })

    // Test Case4: Login with un-registered username
    it('Creating 404 error by user not exist', async() => {
        const userDetails = {
            username: "qwertyuiop",
            password: "1234"
        }
        try {
            await axios.post(`${base_URL}/login`, userDetails);
            expect.fail('Expected to throw an error with status 404');
        } catch (error) {
            expect(error.response.status).to.equal(404);
        }
    })
});