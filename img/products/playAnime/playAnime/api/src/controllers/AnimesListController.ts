import { Request, Response } from 'express';
import cheerio from 'cheerio';
import listAllAnimes from '../utils/ListAnimes';
import { listTypesFiltersAnimes, listAnimesFiltered, listAZ } from '../utils/FilterAnimes';

class AnimesListController {

  async index(request: Request, response: Response) {
    const { page = 1 } = request.params;
    const { filter } = request.query;

    const animesList = await listAllAnimes(Number(page));
    const listFilters =  await listTypesFiltersAnimes();
    const AZList = await listAZ();
  
    const animesFiltered = filter ? await listAnimesFiltered(1, String(filter)) : null;

    return response.json({
      animesList,
      listFilters,
      AZList,
      animesFiltered
    });
  }


}

export default AnimesListController;