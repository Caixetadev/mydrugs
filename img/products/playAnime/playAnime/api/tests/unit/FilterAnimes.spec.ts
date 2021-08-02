import { listTypesFiltersAnimes, listAnimesFiltered, listAZ } from '../../src/utils/FilterAnimes';

describe('FilterAnimes', () => {
  it('should be able to list letters A-Z', async () => {
    const letters = await listAZ();

    // console.log(letters);

    expect(letters).toHaveProperty('idFilterAlphabet');
    expect(letters).toHaveProperty('textFilterAlphabet');
  });

  it('should be able to list all types filters', async () => {
    const filters = await listTypesFiltersAnimes();

    // console.log(filters);

    expect(filters).toHaveProperty('genre');
    expect(filters).toHaveProperty('type');
    expect(filters).toHaveProperty('age');
    expect(filters).toHaveProperty('status');
  });

  it('should be able to list the animes filtereds', async () => {
    const animes = await listAnimesFiltered(1, 'genero=comedia&letra=A');

    // console.log(animes);

    expect(animes).toHaveProperty('info');
    expect(animes).toHaveProperty('idAnimes');
    expect(animes).toHaveProperty('imagesAttributes');
    expect(animes).toHaveProperty('title');
  });


})