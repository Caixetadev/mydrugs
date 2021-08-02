import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import { createStore } from 'redux'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel';
import Modal from './modal';
import Destaque from './Dashboard'
import Carrousel from './Carrosel'

var randomPage = Math.floor(Math.random() * 20) + 1


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: null,
      atualSlide: 0,
      animeDestaque: null,
      searchParam: "",
      searchResult: null,
      vendoAnime: null,
      vendoModal: false,
      loadingAnimes: true,
      fakeLoading: [0,0,0,0,0,0,0,0,0,0],
      animesFavoritos: [],
      carregandoModal: false
    };
  }
  componentDidMount(){
  }
  async submitForm(e){
    e.preventDefault()
    window.scroll({top: 300, left: 0, behavior: 'smooth'});
    if(this.state.searchParam.trim().length > 0){
      const react = this
      try {
        const res = await axios.get(`http://localhost:3333/search/${react.state.searchParam}`);
        const json = res.data
        setTimeout(() => {
          react.setState({ searchResult: json })
        }, 500);
      } catch (error) {
        console.log(`error`)
        return { error };
      }
    }
  }
  async submitFormDigitar(){
    if(this.state.searchParam.trim().length > 0){
      const react = this
      try {
        const res = await axios.get(`http://localhost:3333/search/${react.state.searchParam}`);
        const json = res.data
        react.setState({ searchResult: json })
      } catch (error) {
        console.log(`error`)
        return { error };
      }
    }
  }
  async getAnime(animeID, link) {
    this.setState({vendoAnime: null})
    this.setState({vendoModal: true})
    this.setState({carregandoModal: true})
    document.querySelector('html').style.overflowY = "hidden"
    const react = this
    const response = await axios.get(`http://localhost:3333/animePage/${animeID}/${link}`);
    const jsonTwo = response.data
    var ultimaPagina = jsonTwo.ultimaPagina
    try {
      const res = await axios.get(`http://localhost:3333/anime/${animeID}/${link}/${ultimaPagina}`);
      const json = res.data
      json.ultimaPagina = ultimaPagina
      json.link = link
      json.idAnime = animeID
      this.setState({vendoAnime: json})
      this.setState({carregandoModal: false})
      
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  searchAnime(){
    window.scroll({top: 300, left: 0, behavior: 'smooth'});
    this.setState({searchParam: document.querySelector("#inputAnime").value})
    this.submitFormDigitar()
  }
  sairModal(){
    this.setState({vendoModal: false})
    document.querySelector('html').style.overflowY = "auto"
  }
  addFavorite(anime){
    try {
      var atual = window.localStorage.getItem('favorite') != null ? JSON.parse(window.localStorage.getItem('favorite')) : []
      if(!JSON.parse(window.localStorage.getItem('favorite')).find(e => e.idAnime == anime.idAnime) || window.localStorage.getItem('favorite') == null){
        atual.push(anime)
        window.localStorage.setItem('favorite', JSON.stringify(atual))
      } else{
        const id = atual.indexOf(JSON.parse(window.localStorage.getItem('favorite')).find(e => e.idAnime == anime.idAnime))
        atual.splice(id, 1)
        window.localStorage.setItem('favorite', JSON.stringify(atual))
      }
      
    } catch (error) {
      
    }
  }
  render() {
    return <div className="container">
    <Head>
      <title>NekoWatch</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
    </Head>
    <div>
      { this.state.carregandoModal && <div className="openAnimeBa">
      <i className="fas fa-spinner"></i>
      </div> }
      { this.state.vendoAnime != null && this.state.vendoModal && <Modal 
      home={this}
      anime={this.state.vendoAnime}></Modal> }
    </div>
    <div className="fixedTop">
      <form onSubmit={(e) => this.submitForm(e)}>
        <input 
        autoComplete={"off"}
        id="inputAnime"
        onKeyUp={() => this.setState({searchParam: document.querySelector("#inputAnime").value})}
        onKeyDown={() => this.searchAnime()}
        type="text" placeholder="Buscar animes..."></input>
        <button></button>
      </form>
    </div>
    <Destaque></Destaque>
    <div>
    { this.state.searchResult != null && this.state.searchParam.trim().length > 0 &&
      <div className='searchResult'>
        <h1 className="title">Resultados para { this.state.searchParam }</h1>
        <div>
          {
          this.state.searchResult != null &&
          <Carousel 
          itemsToShow={8}>
          {this.state.searchResult.map(anime => (
            <div>
              <a
              onClick={() => this.getAnime(anime.idAnime, anime.animeLink)}>
              <div 
              className="anime" key={anime.name}>
                <div className="photo">
                  <div className="transparent"></div>
                  <img src={anime.photo}/>  
                </div>
                <h1>{ anime.name }</h1>
              </div>
            </a> 
            </div>
            ))}
          </Carousel>
          }
        </div>
      </div>
      }
      <div className="scrollAnime">
        <Carrousel
        home={this}
        titulo={`Animes aleatórios`}
        url={`page/${randomPage}`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de terror`}
        url={`genre/40`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de ação`}
        url={`genre/1`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de artes Marciais`}
        url={`genre/3`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de bishounen`}
        url={`genre/4 `}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de demônios`}
        url={`genre/8`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de comédia`}
        url={`genre/5`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de suspense`}
        url={`genre/39`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de drama`}
        url={`genre/7`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        type={'search'}
        titulo={`Tudo sobre Naruto`}
        url={`search/Naruto`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        type={'search'}
        titulo={`Tudo sobre Dragon Ball`}
        url={`search/Dragon Ball`}
        ></Carrousel>
        <Carrousel
        home={this}
        type={'search'}
        titulo={`Animes dublados`}
        url={`search/dublado`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de magia`}
        url={`genre/24`}
        >
        </Carrousel>
        <Carrousel
        home={this}
        titulo={`Animes de isekai`}
        url={`genre/48`}
        >
        </Carrousel>
      </div>
    </div>
    

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
        background-color: #181818;
        user-select: none;
        overflow-y: auto;
        overflow-x: hidden;
        padding-bottom: 5vh;
      }

      .searchResult{
        top: -6vh;
        position: relative;
        left: -55px;
        transform: scale(0.98);
      }

      .fakeLoading{
        animation: 1.4s loadindFake infinite;
      }

      @keyframes loadindFake{
        0%{
          background: rgba(255,255,255,0.3)
        }
        0%{
          background: rgba(255,255,255,0.5)
        }
      }

      * {
        box-sizing: border-box;
      }

      .fixedLeft .logo{
        position: absolute;
        width: 100px;
        height: 100px;
        right: 0px;
        float: right;
      }

      .fixedLeft p{
        display: inline-flex;
      }

      .fixedLeft .logo img{
        position: absolute;
        width: 100px;
        transform: rotate(270deg) translateY(53px);
        transition: 0.4s;
      }

      .fixedLeft .logo img:hover{
        transform: rotate(270deg) translateY(0px);
      }

      .FixadoLeft{
        width: 421px !important;
      }

      .fixedLeftNot{
        width: 90px !important;
      }

      .fixedLeft{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 90px;
        height: 100%;
        background: #181818;
        overflow: hidden;
        z-index: 10;
        box-shadow: 1px 2px 1px rgb(47 43 43 / 41%);
      }

      .fixedLeft li{
        list-style: none;
        color: white;
        padding: 10px;
        font-size: 180%;
        position: relative;
        top: 100px;
      }

      .dontFixado li span i{
        position: relative;
        left: -50px !important;
      }

      .dontFixado li p{
        display: none;
      }

      .fixedLeftNot li i{
        display: block;
        position: relative;
        left: 10px !important;
      }

      .fixedLeft li span{
        margin-left: 70px;
      }

      .fixedLeft li span i{
        position: relative;
        left: -20px;
      }

      .fixedLeft .ativo{
        background: white;
        color: #181818;
      }
      
      .title{
        color: #fff;
        position: relative;
        left: 157px;
      }

      .scrollAnime{
        margin-left: -40px;
        top: -5vh;
        left: 10px;
        position: relative;
        transform: scale(0.98);
      }
      
      .anime{
        width: 210px;
        height: 250px;
        display: inline-block;
        cursor: pointer;
      }

      .anime .photo{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
      }

      .anime img{
        width: calc(100% - 4px);
        height: 100%;
        object-fit: cover;
        margin-left: 3px;
        box-shadow: -3px 4px 7px 2px #00000096;
      }

      .anime img:hover{
        border: 2px solid #fff;
      }

      .anime h1{
        position: absolute;
        bottom: 0;
        color: #fff;
        left: 10px;
        font-size: 1.2vw;
        text-shadow: 1px 2px rgba(0,0,0,.90);
        max-width: 80%;
        overflow: hidden;
      }

      .rec-carousel-item{
        width: 200px;
        left: 2vw;
        position: relative;
        margin-left: 5px;
        border: 2px solid transparent;
      }

      .rec-arrow-left{
        margin-left: 50px;
      }

      .fixedTop{
        position: fixed;
        right: 60px;
        z-index: 100;
        top: 40px;
      }

      .fixedTop button{
        display: none;
      }

      .fixedTop input{
        border: none;
        color: #fff;
        padding: 8px;
        border-radius: 4px;
        background: rgba(0,0,0,.80);
        font-size: 20px;
        outline: none;
      }

      .fixedTop input:focus{
        border-bottom: 2px solid #673ab7;
      }

      .rec-dot{
        box-shadow: 0 0 1px 2px rgb(255 255 255 / 50%) !important; 
      }

      .rec-dot_active{
        box-shadow: 0 0 1px 3px rgb(103 58 183) !important;
      }

      .openAnimeBa{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.50);
        z-index: 200;
        top: 0px;
        left: 0px;
      }

      .openAnimeBa i{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 500%;
        animation: 1s loding infinite;
        color: white;
      }

      @keyframes loding{
        0%{
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100%{
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }


    `}</style>
  </div>
  }
}

export default Home