import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

describe('/GET: /api/v1/', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    chai.request(server)
      .get('/api/v1/ere')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({
          message: 'That route does not exist',
        });
        done();
      });
  });

  it('should return status code 404 when user visit an unregistered route', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          message: 'Welcome to More Recipes',
        });
        done();
      });
  });
});
