import { animesCommons, lastEntriesEpisodes, animesList } from '../../src/utils/Home/';

describe('Home', () => {
  it('should be able to list the common animes', async () => {
    const testAnimesCommons = await animesCommons(); 
      
    // console.log(testAnimesCommons);

    expect(testAnimesCommons).toHaveProperty('info');
    expect(testAnimesCommons).toHaveProperty('idAnimes');
    expect(testAnimesCommons).toHaveProperty('imagesAttributes');
    expect(testAnimesCommons).toHaveProperty('title');
  });

  it('should be able to list the last entries episodes', async () => {
    const testLastEntriesEpisodes = await lastEntriesEpisodes(1);

    // console.log(testLastEntriesEpisodes);

    expect(testLastEntriesEpisodes).toHaveProperty('info');
    expect(testLastEntriesEpisodes).toHaveProperty('idEpisode');
    expect(testLastEntriesEpisodes).toHaveProperty('imagesAttributes');
    expect(testLastEntriesEpisodes).toHaveProperty('datas');
    expect(testLastEntriesEpisodes).toHaveProperty('episodesNumbers');
    expect(testLastEntriesEpisodes).toHaveProperty('episodesTitles');
  });

  it('should be able to list the animes', async () => {
    const testAnimesList = await animesList();

    // console.log(testAnimesList);

    expect(testAnimesList).toHaveProperty('info');
    expect(testAnimesList).toHaveProperty('idAnimes');
    expect(testAnimesList).toHaveProperty('imagesAttributes');
    expect(testAnimesList).toHaveProperty('title');
  });
});