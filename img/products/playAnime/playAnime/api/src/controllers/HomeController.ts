import { Request, Response } from 'express';
import cheerio from 'cheerio';
import {animesRequest} from '../services/animeflvbr';
import { animesCommons, lastEntriesEpisodes, animesList } from '../utils/Home';

class HomeController {

  async index(request: Request, response: Response) {
    const { page = 1 } = request.params;
    const body = await animesRequest.get(`lista/pagina/${page}`);
    
    const $ = cheerio.load(body.data);
    var animes = new Array()
    
    $('.loadscrollleft').find($('.ansArea').find('.item-an')).each(async function(i: number, element) {
      const idAnime = $(element).find('.post').find('a').attr('href')?.split('/')[2]
      const animeLink = $(element).find('.post').find('a').attr('href')?.split('/')[3] 
      const photo = `https://www.branitube.net${$(element).find('.post').find('a').find('img').attr('src')}`
      const name = $(element).find('.namean').find('a').text()
      animes.push({
        name: name,
        idAnime: idAnime,
        animeLink: animeLink,
        ultimaPagina: 1,
        photo: photo.replace('300','1200')
      })
    })
    
    return response.json({animes});
  }

  async filter(request: Request, response: Response) {
    const { idGenero } = request.params;
    const body = await animesRequest.get(`lista/filter/type/all/status/all/orderby/name/category/all/season/all/duration/all/year/all/studio/all/uploader/all/genres-${idGenero}`);
    
    const $ = cheerio.load(body.data);
    var animes = new Array()
    
    $('.loadscrollleft').find($('.ansArea').find('.item-an')).each(async function(i: number, element) {
      const idAnime = $(element).find('.post').find('a').attr('href')?.split('/')[2]
      const animeLink = $(element).find('.post').find('a').attr('href')?.split('/')[3] 
      const photo = `https://www.branitube.net${$(element).find('.post').find('a').find('img').attr('src')}`
      const name = $(element).find('.namean').find('a').text()
      animes.push({
        name: name,
        idAnime: idAnime,
        animeLink: animeLink,
        ultimaPagina: 1,
        photo: photo.replace('300','1200')
      })
    })
    
    return response.json({animes});
  }

  async getPaginasMax(request: Request, response: Response){
    const { idAnime, animeLink } = request.params;
    var animePage = await animesRequest.get(`lista/${idAnime}/${animeLink}/1`);
    var $ = cheerio.load(animePage.data);
    var ultimaPagina
    $('.paginationContent ul').find('li').each(function(i: number, elementTwo) {
      if($(elementTwo).find("a").text() == 'Última Página'){
        ultimaPagina = $(elementTwo).find("a").attr('href')?.split('/')[5]
      }
    });
    return response.json({ultimaPagina})
  }

}

export default HomeController;

