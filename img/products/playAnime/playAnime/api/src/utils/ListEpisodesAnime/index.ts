import {animesRequest} from '../../services/animeflvbr';
import cheerio from 'cheerio';

async function listEpisodeAnime(idAnime: string, idPagina: string, Anime: string) {
  const body = await animesRequest.get(`/lista/${idAnime}/${Anime}/pagina/${idPagina}`);
  const url = "https://www.branitube.net"
  const $ = cheerio.load(body.data);
  const photo = `${url}${$('.imgPoster img').attr('src')}`
  const animeNome = $(".largeSize").text()
  const sinopse = $(".sinopseText").text()
  var imageCover = $('.areaCoverAnime').find('.imgCover').find('img').attr('src')
  var ultimaPagina
  var linkPagina
  $('.paginationContent ul').find('li').each(function(i: number, element) {
    if($(element).find("a").text() == 'Última Página'){
      linkPagina = $(element).find("a").attr('href')?.split('/')
    }
  });
  
  var dados = {
    photo: photo,
    animeNome: animeNome,
    sinopse: sinopse,
    imageCover: imageCover,
    linkPagina: linkPagina,
    generos: new Array(),
    idEpisode: new Array()
  }

  // const animeName: string = $('.breadcrumbList').find('h1').text();
  // const thumb: string = $('.thumb').find('img')[0].attribs.src;
  // const synopsis: string = $('.sinopse').text().trim();
  // const information: string[] = [];
  // const idEpisode: string[] = [];

  // $('.infoCP').find('span').each(function(i: number, element) {
  //   information[i] = $(element).text().split(':')[1];
  // });

  // const genre: any = [];
  // $('.infoCP').find('span').find('a').each(function(i: number, element) {
  //   genre[i] = $(element).text();
  // });
  // const genreSerialized = genre.map((gen:any) => `${gen}, `);
  // const animesInformation: object = {
  //   format: information[0],
  //   genre: genreSerialized,
  //   typeEpisode: information[2],
  //   episode: information[3],
  //   movies: information[4],
  //   ovas: information[5],
  //   status: information[6],
  //   launchDay: information[7],
  //   year: information[8],
  // };
  $('.item-ep').find('.area-ep').each(function(i: number, element) {
    var idEpisode = $(element).find('a').attr('href')
    var ep = $(element).find('.infos-bottom').find('.ep-info').find('.anime-content').text()
    var title = $(element).find('a').attr('title')
    var imageCover
    var image = ""
    if(idEpisode?.includes("/video")){
      idEpisode = idEpisode.split('/')[2]
      title = title?.split("-")[0]
      image = `https://branitube.net${$(element).find('img').attr('src')}`
      image = image.replace('300', '720')
      dados.idEpisode.push({
        episodeId: idEpisode,
        title: title,
        image: image,
        episode: ep
      })
    }
  });

  dados.idEpisode = dados.idEpisode.slice(0).reverse();

  return dados

  // return {
  //   animeName,
  //   thumb,
  //   synopsis,
  //   animesInformation,
  //   idEpisode
  // };
}

export default listEpisodeAnime;