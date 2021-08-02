import { Request, Response } from 'express';
import cheerio from 'cheerio';
import listAnimesFinded from '../utils/ListAnimesFinded';

class AnimesFindedController {

  async index(request: Request, response: Response) {
    const { page = 1, search } = request.params;
    const animesFinded = await listAnimesFinded(String(search), Number(page)); 

    return response.json(animesFinded);
  }
}

export default AnimesFindedController;