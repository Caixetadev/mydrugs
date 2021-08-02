import listAnimes from '../../src/utils/ListAnimes';

describe('ListAnimes', () => {
  it('should be able list animes', async () => {
    const animes = await listAnimes(1);

    // console.log(animes);

    expect(animes).toHaveProperty('info');
    expect(animes).toHaveProperty('idAnimes');
    expect(animes).toHaveProperty('imagesAttributes');
    expect(animes).toHaveProperty('title');
    expect(animes).toHaveProperty('paginationNumbers');
  });
})