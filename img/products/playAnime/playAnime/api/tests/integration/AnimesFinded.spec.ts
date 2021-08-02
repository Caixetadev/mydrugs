import request from 'supertest';
import app from '../../src/app';
import listAnimesFinded from '../../src/utils/ListAnimesFinded';

describe('AnimesFinded Integration', () => {
  it('should be able to find animes from route /search', async () => {
    const response = await request(app).get('/search/Mahou');

    // console.log(response.body);

    expect(response.body).toHaveProperty('idAnimes');
    expect(response.body).toHaveProperty('imagesAttributes');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('paginationNumbers');
  });

  it('should be able to find animes in page 2 from route /search/:search/page/2', async () => {
    const response = await request(app).get('/search/Mahou/page/2');

    // console.log(response.body);

    expect(response.body).toHaveProperty('idAnimes');
    expect(response.body).toHaveProperty('imagesAttributes');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('paginationNumbers');
  });
})