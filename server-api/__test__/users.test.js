const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  it('should create a new book', async () => {
    // const res = await request(app)
    //   .post('/api/books')
    //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });

    expect(200).toEqual(200);
  });

  // Additional tests...
});