import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

describe('Tests for all API endpoints', () => {
  describe('/POST Recipe creation test', () => {
    it('should return \'Recipe parameter(s) missing\'', (done) => {
      chai.request(server)
        .post('/api/v1/recipes')
        .set('Accept', 'application/json')
        .send({
          name: '',
          description: 'Very good delicacy',
          ingredient: 'Water and pepper',
          image: 'img_01',
          upvote: 343,
          downvote: 32
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            error: true,
            message: 'Recipe parameter(s) missing'
          });
          done();
        });
    });

    it('should return \'Recipe successfully created\'', (done) => {
      chai.request(server)
        .post('/api/v1/recipes')
        .set('Accept', 'application/json')
        .send({
          name: 'Afang soup',
          description: 'Very good delicacy',
          ingredient: 'Water and pepper',
          image: 'img_01',
          upvote: 343,
          downvote: 32
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            error: false,
            message: 'Recipe successfully created',
            status: 200
          });
          done();
        });
    });

    it('should return \'Get all recipes\'', (done) => {
      chai.request(server)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should return \'Show instance of an Array\'', (done) => {
      chai.request(server)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.body).to.be.an.instanceof(Array);
          done();
        });
    });

    it('should return \'Recipe successfully updated\'', (done) => {
      chai.request(server)
        .put('/api/v1/recipes/1')
        .set('Accept', 'application/json')
        .send({
          name: 'Afang soup',
          description: 'Very good delicacy',
          ingredient: 'Water and pepper',
          image: 'img_01',
          upvote: 343,
          downvote: 32
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            error: false,
            message: 'Recipe successfully updated'
          });
          done();
        });
    });

    it('should return \'Review successfully created\'', (done) => {
      chai.request(server)
        .post('/api/v1/recipes/1/reviews')
        .set('Accept', 'application/json')
        .send({
          id: 2,
          recipeId: 'Very good delicacy',
          review: 'A very sumptous mean'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            error: false,
            message: 'Review successfully created',
            status: 200
          });
          done();
        });
    });

    it('should check if output is of Array type', (done) => {
      chai.request(server)
        .post('/api/v1/recipes/1/reviews')
        .set('Accept', 'application/json')
        .send({
          id: 2,
          recipeId: 'Very good delicacy',
          review: 'A very sumptous mean'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            error: false,
            message: 'Review successfully created',
            status: 200
          });
          done();
        });
    });

    it('should return \'Review parameter(s) missing\'', (done) => {
      chai.request(server)
        .post('/api/v1/recipes/1/reviews')
        .set('Accept', 'application/json')
        .send({
          id: 1,
          recipeId: 'Very good delicacy',
          review: ''
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            error: true,
            message: 'Review parameter(s) missing'
          });
          done();
        });
    });
  });
});
