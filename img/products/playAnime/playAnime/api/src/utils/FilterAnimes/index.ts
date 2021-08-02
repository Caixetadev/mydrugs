import {animesRequest} from '../../services/animeflvbr';
import cheerio from 'cheerio';
import animesSection from '../animesSection';
import paginationAnimes from '../paginationAnimes';

async function listAZ() {
  const body = await animesRequest.get('/lista');
  const $ = cheerio.load(body.data);

  const idFilterAlphabet: string[] = [];
  const textFilterAlphabet: string[] = [];
  $('.filtroAZ').find('a').each(function(i: number, element) {
    idFilterAlphabet[i] = $(element)[0].attribs.href.split('?')[1];
    textFilterAlphabet[i] = $(element).find('li').text();
  });

  return {
    idFilterAlphabet,
    textFilterAlphabet
  }
}

async function listTypesFiltersAnimes() {
  const body = await animesRequest.get('/lista');
  const $ = cheerio.load(body.data);

  const genreQueryParams: string[] = [];
  const genreNames: string[] = [];
  const typeQueryParams: string[] = [];
  const typeNames: string[] = [];
  const ageQueryParams: string[] = [];
  const ageNames: string[] = [];
  const statusQueryParams: string[] = [];
  const statusNames: string[] = [];

  const selectGenre = $('select')[0];
  const selectType = $('select')[1];
  const selectAge = $('select')[2];
  const selectStatus = $('select')[3];

  $(selectGenre).find('option').each(function(i: number, element) {
    genreQueryParams[i] = $(element)[0].attribs.value.split('=')[1];
    genreNames[i] = $(element).text();
  });

  $(selectType).find('option').each(function(i: number, element) {
    typeQueryParams[i] = $(element)[0].attribs.value.split('=')[1];
    typeNames[i] = $(element).text();
  });

  $(selectAge).find('option').each(function(i: number, element) {
    ageQueryParams[i] = $(element)[0].attribs.value.split('=')[1];
    ageNames[i] = $(element).text();
  });

  $(selectStatus).find('option').each(function(i: number, element) {
    statusQueryParams[i] = $(element)[0].attribs.value.split('=')[1];
    statusNames[i] = $(element).text();
  });

  return {
    genre: {
      genreQueryParams,
      genreNames
    },
    type: {
      typeQueryParams,
      typeNames
    },
    age: {
      ageQueryParams,
      ageNames
    },
    status: {
      statusQueryParams,
      statusNames
    }
  }
}

async function listAnimesFiltered(page: number, queryParam: string) {
  const query = page <= 1 ? `/lista?${queryParam}` : `/lista/page/${page}?${queryParam}`;
  const body = await animesRequest.get(query);
  const animes = await animesSection(query, 0);

  const paginationNumbers = await paginationAnimes(body.data, 5);
  
  return {
    info: "ANIMES FILTRADOS",
    idAnimes: animes.idAnimes,
    imagesAttributes: animes.imagesAttributes,
    title: animes.title,
    paginationNumbers
  };
}

export { listTypesFiltersAnimes, listAnimesFiltered, listAZ };