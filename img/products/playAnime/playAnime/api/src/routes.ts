import express from 'express';
import HomeController from './controllers/HomeController';
import AnimesListController from './controllers/AnimesListController';
import AnimesFindedController from './controllers/AnimesFindedController';
import EpisodesController from './controllers/EpisodesController';

const routes = express.Router();

const homeController = new HomeController;
const animesListController = new AnimesListController;
const animesFindedController = new AnimesFindedController;
const episodesController = new EpisodesController;

routes.get('/', homeController.index);
routes.get('/page/:page', homeController.index);

routes.get('/lista', animesListController.index);
routes.get('/lista/page/:page', animesListController.index);
routes.get('/genre/:idGenero', homeController.filter);

routes.get('/search/:search', animesFindedController.index);
routes.get('/search/:search/page/:page', animesFindedController.index);

routes.get('/anime/:idAnime/:Anime/:idPagina', episodesController.index);
routes.get('/video/:idEpisode', episodesController.show);

routes.get('/animePage/:idAnime/:animeLink', homeController.getPaginasMax);

routes.get('')

export default routes;