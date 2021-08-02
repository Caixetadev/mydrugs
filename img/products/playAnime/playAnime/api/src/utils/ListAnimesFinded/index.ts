import {animesRequestSearch} from '../../services/animeflvbr';
import cheerio from 'cheerio';
import animesSection from '../animesSection';
import paginationAnimes from '../paginationAnimes';

async function listAnimesFinded(search: string, page: number) {
  const body = await animesRequestSearch(`/buscar/${search}`);
  const animes = new Array()
  const $ = cheerio.load(body.data);
  $('.loadscrollleft').find($('.areaAnsTotal').find('.container-area')).find(".getTotalShowingAn").find(".item-an").each(function(i: number, element) {
    const idAnime = $(element).find('.post').find('a').attr('href')?.split('/')[2]
    const photo = `https://www.branitube.net${$(element).find('.post').find('a').find('img').attr('src')}`
    const name = $(element).find('.namean').find('a').text()
    const animeLink = $(element).find('.post').find('a').attr('href')?.split('/')[3] 
      animes.push({
      name: name,
      idAnime: idAnime,
      animeLink: animeLink,
      photo: photo.replace('300','1200')
    })
  })
  return animes
  return {
    info: "ANIMES ENCONTRADOS"
  };
}

export default listAnimesFinded;