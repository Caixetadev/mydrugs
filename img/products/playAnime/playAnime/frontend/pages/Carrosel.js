import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import Modal from './modal';

class Carrousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: null,
      vendoAnime: null,
      vendoModal: false,
      loadingAnimes: true,
      fakeLoading: [0,0,0,0,0,0,0,0,0,0],
      width: 1920,
      toShow: 8
    };
    this.getAnime= this.getAnime.bind(this);
    this.changeView= this.changeView.bind(this);
  }
  componentDidMount(){
    this.setState({animes: []})
    this.getAnimes()
    this.setState({width: window.innerWidth})
    this.changeView()
    window.addEventListener('resize', () => {
      this.setState({width: window.innerWidth})
      this.changeView()
    })
  }
  changeView(){
    if(this.state.width > 1920){
      this.setState({toShow: 8})
    } else if(this.state.width >= 1720 && this.state.width <= 1920){
      this.setState({toShow: 8})
    } else if(this.state.width >= 1496 && this.state.width <= 1720){
      this.setState({toShow: 7})
    } else if(this.state.width >= 1496 && this.state.width <= 1720){
      this.setState({toShow: 6})
    } else if(this.state.width >= 1362 && this.state.width <= 1496){
      this.setState({toShow: 6})
    } else if(this.state.width >= 979 && this.state.width <= 1362){
      this.setState({toShow: 5})
    } else if(this.state.width >= 803 && this.state.width <= 979){
      this.setState({toShow: 4})
    } else if(this.state.width >= 803 && this.state.width <= 803){
      this.setState({toShow: 3})
    } else{
      this.setState({toShow: 2})
    }
  }
  async getAnimes() {
    const react = this
    try {
      const res = await axios.get(`http://localhost:3333/${react.props.url}`);
      const json = res.data
      if(react.props.type != undefined && react.props.type == 'search'){
        react.setState({animes: json})
      }else{
        react.setState({animes: json.animes})
      }
      react.setState({loadingAnimes: false})
    } catch (error) {
      console.error(`Erro fetchin url [ ${react.props.url} ]`)
      return { error };
    }
  }
  async getAnime(animeID, link) {
    this.props.home.setState({vendoAnime: null})
    this.props.home.setState({vendoModal: true})
    this.props.home.setState({carregandoModal: true})
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
      react.props.home.setState({vendoAnime: json})
      react.props.home.setState({carregandoModal: false})
      
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  render() {
    return <div className="container">
    { this.state.vendoModal && this.state.vendoAnime != null &&
    <div>
    
    <Modal 
      home={this}
      anime={this.state.vendoAnime}></Modal>
    </div>
    }
    <div className="scrollAnime">
      <h1 className="title">{ this.props.titulo }</h1>
      <div>
        {
        this.state.animes != null &&
        <Carousel
        itemsToShow={this.state.toShow}>
        { this.state.animes.map(anime => (
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
          { this.state.loadingAnimes && this.state.fakeLoading .map(anime => (
          <div>
            <a>
            <div 
            className="anime" key={anime}>
              <div className="photo fakeLoading">
                <div className="transparent"></div> 
              </div>
              <h1></h1>
            </div>
          </a> 
          </div>
          ))}
        </Carousel>
        }
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
        left: 64px;
      }

      .scrollAnime{
        margin-left: -40px;
        top: -12vh;
        position: relative;
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

export default Carrousel