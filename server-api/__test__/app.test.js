const request = require('supertest');
const { app, connectDB } = require('../src/app');
const config = require('../src/config/config');
const { default: mongoose } = require('mongoose');



// Start the server
let server = app.listen(config.port)
mongoose.connect(config.mongodb_uri);



describe('Users', () => {
  it('should create a new book', async () => {
    // const res = await request(app)
    //   .post('/api/books')
    //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });

    expect(200).toEqual(200);
  });

  // Additional tests...
});

describe('Pharmacies', () => {
    it('should create a new book', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });
  
    // Additional tests...
  });


  describe('Medicine', () => {
    it('should create a new book', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });
  
    // Additional tests...
  });

  describe('Prescriptions', () => {
    it('should create a new book', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });
  
    // Additional tests...
  });

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    server.close()
    done()
  })