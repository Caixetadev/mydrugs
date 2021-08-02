import cheerio from 'cheerio';
import listEpisodesAnime from '../../src/utils/ListEpisodesAnime';

describe('ListEpisodesAnime', () => {
  it('should to list all episodes the anime', async () => {
    const anime = await listEpisodesAnime('princess-connect-redive');
    // console.log(anime); 

    expect(anime).toHaveProperty('animeName');
    expect(anime).toHaveProperty('thumb');
    expect(anime).toHaveProperty('synopsis');
    expect(anime).toHaveProperty('animesInformation');
    expect(anime).toHaveProperty('idEpisode');
  }); 

})