import {animesRequest} from '../services/animeflvbr';
import cheerio from 'cheerio';

export default async function(urlParams: string, section: number) {

  const body = await animesRequest.get(urlParams);

  const $ = cheerio.load(body.data);

  const idAnimes: string[] = [];
  const imagesAttributes: object[] = [];
  const title: string[] = [];

  const cheerioAnimesList= $('.loadscrollleft')[section];
  $(cheerioAnimesList).find('.item-an').each(function(i: number, element:any) {
    idAnimes[i] = $(element).find('.post')[0].attribs.href.split('/')[2];
    imagesAttributes[i] = {
      src: $(element).find('img')[0].attribs.src,
      alt: $(element).find('img')[0].attribs.alt,
      title: $(element).find('img')[0].attribs.title
    };
      
    title[i] = $(element).find('.title').text();
  });
  
  return {
    idAnimes,
    imagesAttributes,
    title
  };
}