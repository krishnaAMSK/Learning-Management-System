const axios = require('axios');
const { expect } = require('chai');
const assert = require('assert');

const base_URL = "http://localhost:8000"

describe('Testing Register API', ()=>{
    // TestCase1: For registering a new user
    it('Register new user', async() => {
        const newUserDetails = {
            username: "testUser1",
            password: "1234",
            email: "abcxyz@gmail.com",
            userRole: "student"
        }

        const response = await axios.post(`${base_URL}/register`, newUserDetails);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.success, `New user ${newUserDetails.username} created!`);
    })

    // Test Case2: Checking for duplicate user register
    it('Creating 409 error for duplicate user', async() => {
        const newUserDetails = {
            username: "testUser1",
            password: "1234",
            email: "abcxyz@gmail.com",
            userRole: "student"
        }
        try {
            await axios.post(`${base_URL}/register`, newUserDetails);
            expect.fail('Expected to throw an error with status 409');
        } catch (error) {
            expect(error.response.status).to.equal(409);
        }
    })

    //Test Case3: Leaving an parameter empty
    it('Creating 400 error by missing few parameters', async() => {
        const newUserDetails = {
            username: "testUser2",
            password: "1234",
            userRole: "student"
        }
        try {
            await axios.post(`${base_URL}/register`, newUserDetails);
            expect.fail('Expected to throw an error with status 400');
        } catch (error) {
            expect(error.response.status).to.equal(400);
        }
    })

    // Test Case4: Creating user with existing email but with an unique username
    it('Creating 500 error by duplicating email', async() => {
        const newUserDetails = {
            username: "testUser10",
            password: "password",
            email: "abcxyz@gmail.com",
            userRole: "teacher"
        }
        try {
            await axios.post(`${base_URL}/register`, newUserDetails);
            expect.fail('Expected to throw an error with status 500');
        } catch (error) {
            expect(error.response.status).to.equal(500);
        }
    })
});