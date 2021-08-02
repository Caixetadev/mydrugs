import request from 'supertest';
import app from '../../src/app';

describe('AnimesList Integration', () => {
  it('should be able list animes from route /list', async () => {
    const response = await request(app).get('/lista');

    // console.log(response.body);

    expect(response.body).toHaveProperty('animesList');
    expect(response.body).toHaveProperty('listFilters');
    expect(response.body).toHaveProperty('AZList');
    expect(response.body).toHaveProperty('animesFiltered');
  });

  it('should be able list animes the page 2 from route /lista/page/2', async () => {
    const response = await request(app).get('/lista/page/2');

    // console.log(response.body);

    expect(response.body).toHaveProperty('animesList');
    expect(response.body).toHaveProperty('listFilters');
    expect(response.body).toHaveProperty('AZList');
    expect(response.body).toHaveProperty('animesFiltered');
  });
})