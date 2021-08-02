import { Request, response, Response } from 'express';
import cheerio from 'cheerio';
import watchEpisode from '../utils/WatchEpisodeAnime';
import listEpisodes from '../utils/ListEpisodesAnime';
import {animesRequest} from '../services/animeflvbr';
import * as http from 'http';

class EpisodesController {
  async index(request: Request, response: Response) {
    const { idAnime, idPagina, Anime } = request.params;
    const episodes = await listEpisodes(idAnime, idPagina, Anime);
    return response.json(episodes);
  }

  async show(request: Request, response: Response) {
    const { idEpisode } = request.params;
    const body = await animesRequest.get(`/video/${idEpisode}`);
    var episode =  await watchEpisode(idEpisode);
    const $ = cheerio.load(body.data);
    episode.nomeAnime = $('title').text().split("»")[0]
    return response.json(episode);
  }

  pipeRequest=(url: any,res: any)=> {
    http.get(url, (getRes)=>{
      res.setHeader("content-type", getRes.headers['content-type']);
      getRes.pipe(res);
    })
  }

  async player(req: Request, res: Response) {
    var path = require('path');
    var mime = require('mime');
    var fs = require('fs');
    const fetch = require('node-fetch');
    var { url } = req.params;
    for(var i = 0; i < url.length; i++){
      url = url.replace('&', "/")
    }
    url =  `https://video.branitube.net/${url}`;
    console.log(url)
    this.pipeRequest("https://storage.googleapis.com/BUCKET_NAME/FILENAME.html",res);
    
  }
}

export default EpisodesController;