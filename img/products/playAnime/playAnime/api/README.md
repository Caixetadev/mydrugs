# Web scraping - API de animes

<p align="center">
  <img src="https://img.shields.io/github/languages/top/HallanCosta/api-animes?style=flat-square%22">
  <img src="https://img.shields.io/github/license/HallanCosta/api-animes">
</p>

<p align="center">
  <a href="#bookmark-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#collision-como-executar-a-api">Como executar</a>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#earth_americas-como-usar-as-rotas">Como usar rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#exclamation-explicação">Explicação das  rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#books-dependências">Dependências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-desenvolvimento">Author</a>
</p>

## :bookmark: Sobre
>:pushpin: 
**Web scraping** ou **Web crawler**, nada mais é do que utilizar técnicas de desenvolvimento para extrair/obter informações de websites. 
>
>Utilizando as rotas da api você consegue desfrutas de animes que a pagína **AnimeFLVBR** disponibiliza, alguns exemplos são:
>- [X] Listar os animes e paginar está lista.
>- [X] Pesquisar os animes e paginar está  pesquisa.
>- [X] Listar todos os episódios do anime desejado. 
>- [X] Assistir episódio do anime desejado.

**API crawler**:  [AnimeFLVBR](https://animeflvbr.com)

## :collision: Como executar a API

### :dvd: Iniciando a api e :mag_right: testes.
1. Crie uma pasta e execute `git clone https://github.com/HallanCosta/api-animes.git .` para fazer um clone da api.

2. Execute os comando a seguir para instalar e iniciar.
	```sh
	# Instalação.
	$ yarn install # ou npm install
	# Execução.
	$ yarn dev # ou npm run dev
	```
3. Execute os comando a seguir para executar testes na api.

	```sh
	# Instalação obs: só execute se não tiver seguidos os passos acima.
	$ yarn install # ou npm install
	# Execução.
	$ yarn test # ou npm run test
	```

## :earth_americas: Como usar as rotas

### Como acessar algumas das páginas do site : [AnimeFLVBR](https://animeflvbr.com)

 **Home:** `http://localhost:3333/`
 
 **Lista de animes:** `http://localhost:3333/lista`
 **Lista de animes com paginação:** `http://localhost:3333/lista/page/:NUMERO_DA_PAGINA`
 
 **Encontrar animes:** `http://localhost:3333/search/:ID_DO_ANIME`
 **Encontrar animes com paginação:** `http://localhost:3333/search/:ID_DO_ANIME/page/:NUMERO_DA_PAGINA`
 
 **Episódios do anime:** `http://localhost:3333/anime/:ID_DO_ANIME`
 **Episódio do anime para assistir:** `http://localhost:3333/video/:ID_DO_EPISODIO`

## :exclamation: Explicação
A rota **Home** será retornado um json com os animes populares, ultimos lançamentos episódios e alguns animes da lista de animes. 

A rota **Lista de animes** será retornado um json com todos os animes e você pode fazer uma paginação utilizando a rota **Lista de animes com paginação**, em `:NUMERO_DA_PAGINA` você colocar o número da pagína.

A rota **Encontrar animes** será retornado json com os animes encontrados dentro do parâmetro`:ID_DO_ANIME` e você pode pegar o idAnimes e usar na rota **Episódios do anime** ou  **Encontrar animes**  no parâmetro `:ID_DO_ANIME`.  Na rota **Encontrar animes com paginação** você pode fazer uma paginação com os animes encontrados.


A rota **Episódios do anime** em `:ID_DO_ANIME` você deve colocar o nome do anime para retornar um json com todos os episódios desse anime.

A rota **Episódio do anime para assistir** será retornado um json com os videos dos animes, em `:ID_DO_EPISODIO` você deve colocar o id que é retornado da rota **Episódios do anime** ou **Home**.

## :books: Dependências
### 1. Dependências
 - [x] Axios
 - [x] Cheerio
 - [x] Express
 - [x] Cors

### 2. Dependências de desenvolvimento

 - [x] Jest
 - [x]  Supertest

## :memo: Licença
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/HigorSnt/proffy/blob/master/LICENSE.md) para mais detalhes.

## :computer: Desenvolvimento
| Author |
|--|
| [<img src="https://avatars2.githubusercontent.com/u/60573155?s=115&v=3"><br><sub>@HallanCosta</sub>](https://github.com/HallanCosta) |