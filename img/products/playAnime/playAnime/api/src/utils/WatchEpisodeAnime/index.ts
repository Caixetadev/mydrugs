import {animesRequest, getAnimeVideo} from '../../services/animeflvbr';
import cheerio from 'cheerio';

async function watchEpisode(idEpisode: string) {
  const body = await getAnimeVideo(idEpisode);
  return body.data
}

export default watchEpisode;