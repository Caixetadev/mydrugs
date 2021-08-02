import request from 'supertest';
import app from '../../src/app';

describe('Episodes Integration', () => {
  it('should be able to list all episodes the anime from /anime/:idAnime', async () => {
    const response = await request(app).get('/anime/mahou-shoujo-site');

    // console.log(response.body);

    expect(response.body).toHaveProperty('animeName');
    expect(response.body).toHaveProperty('thumb');
    expect(response.body).toHaveProperty('synopsis');
    expect(response.body).toHaveProperty('animesInformation');
    expect(response.body).toHaveProperty('idEpisode');
  });

  it('should be able to list the episode the anime from /video/:idEpisode', async () => {
    const response = await request(app).get('/video/55698');

    // console.log(response.body);

    expect(response.body).toHaveProperty('sd');
    expect(response.body).toHaveProperty('hd');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('episodeNumber');
    expect(response.body).toHaveProperty('episodeDescription');
  });
})