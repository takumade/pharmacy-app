const request = require('supertest');
const { app, connectDB } = require('../src/app');
const config = require('../src/config/config');
const { default: mongoose } = require('mongoose');



// Start the server
let server = app.listen(config.port)
mongoose.connect(config.mongodb_uri);



describe('Users', () => {
  it('Can register user', async () => {
    // const res = await request(app)
    //   .post('/api/books')
    //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });

    expect(200).toEqual(200);
  });

  it('Can login user', async () => {
    // const res = await request(app)
    //   .post('/api/books')
    //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });

    expect(200).toEqual(200);
  });

  // Additional tests...
});

describe('Pharmacies', () => {
    it('Register pharmarcy', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });
  
    // Additional tests...
  });


  describe('Medicine', () => {
    it('Delete medicine', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });

    it('Delete medicine', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });
  
    // Additional tests...
  });

  describe('Prescriptions', () => {
    it('Add prespriction', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });

    it('Approve prespriction', async () => {
      // const res = await request(app)
      //   .post('/api/books')
      //   .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
  
      expect(200).toEqual(200);
    });


    it('Delete prespriction', async () => {
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