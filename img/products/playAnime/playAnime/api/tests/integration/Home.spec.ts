import request from 'supertest';
import app from '../../src/app';
import { animesCommons, lastEntriesEpisodes, animesList } from '../../src/utils/Home/';

describe('Home Integration', () => {
  it('should be able to list the common animes', async () => {
    const response = await request(app).get('/');

    // console.log(response.body);

    expect(response.body).toHaveProperty('animes');
    expect(response.body).toHaveProperty('episodes');
    expect(response.body).toHaveProperty('listAnimes');
  });
})