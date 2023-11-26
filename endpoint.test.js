const supertest = require('supertest');
const {app, server} = require("../index.js"); // Import the app for testing

const request = supertest.agent(app);
describe('GET /search/:inputString', () => {
  it('should return the object when a match is found', async () => {
    const response = await request(app).get('/search/apple');
    expect(response.status).toBe(200);
    expect(response.body.response).toEqual({ id: 1, name: 'Apple' });
  });

  it('should return "No match found" when no match is found', async () => {
    const response = await request(app).get('/search/grape');
    expect(response.status).toBe(200);
    expect(response.body.response).toBe('No match found');
  });

  it('should handle empty input', async () => {
    const response = await request(app).get('/search/');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Empty input provided');
  });

  it('should handle special characters and numbers in input', async () => {
    const response = await request(app).get('/search/1234!@#$');
    expect(response.status).toBe(200);
    expect(response.body.response).toBe('No match found');
  });

  it('should handle case insensitivity', async () => {
    const response1 = await request(app).get('/search/OrAnGe');
    expect(response1.status).toBe(200);
    expect(response1.body.response).toEqual({ id: 3, name: 'Orange' });

    const response2 = await request(app).get('/search/BAnAna');
    expect(response2.status).toBe(200);
    expect(response2.body.response).toEqual({ id: 2, name: 'Banana' });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });
});
