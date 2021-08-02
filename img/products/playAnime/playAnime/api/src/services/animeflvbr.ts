import axios from 'axios';

const FormData = require('form-data');

export const animesRequest = axios.create({ 
  baseURL: 'https://www.branitube.net/'
}); 

export const animesRequestSearch = (search: any) => {
  return axios.get(`https://www.branitube.net${search}`)
}

export const getAnimeVideo = (idEp: any) => {
  var querystring = require('querystring');

  return axios.post('https://www.branitube.net/api/v1/load-player', querystring.stringify({ ep_id: idEp }))
}

export const getNameVideo = (idEp: any) => {
  return axios.get(`https://www.branitube.net/video/${idEp}`)
}