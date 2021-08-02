import {animesRequest} from '../../services/animeflvbr';
import cheerio from 'cheerio';
import animesSection from '../animesSection';
import paginationAnimes from '../paginationAnimes';

async function animesCommons() {
  const body = await animesRequest.get('/');

  const $ = cheerio.load(body.data);

  $('.item-ep').find('.loadscrollleft').each(function(i: number, element) {
    console.log(element)
  })
  
  return {}
}

async function lastEntriesEpisodes(page: number) {
  const body = await animesRequest.get('/');

  const $ = cheerio.load(body.data);

  $('.item-ep').find('.loadscrollleft').each(function(i: number, element) {
    console.log(element)
  })
  
  return {}
}

async function animesList() {
  const animes = await animesSection('/', 2);
  
  return {
  };
}

export { animesCommons, lastEntriesEpisodes, animesList };