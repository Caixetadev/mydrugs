import Head from 'next/head'
import axios from 'axios';
import React from 'react'
import ReactNetflixPlayer from '../../player'

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anime: null,
      loadingPlayer: false
    };
  }
  componentDidMount(){
    this.getPlayer()
  }
  async getPlayer() {
    const epVideo = document.location.pathname.split('/')[2] 
    const react = this
    try {
      const res = await axios.get(`http://localhost:3333/video/${epVideo}`);
      const json = res.data
      react.setState({anime: json})
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  render() {
    return <div>
      <Head>
      <title>NekoWatch - Assistindo { this.state.anime != null ? this.state.anime.nomeAnime : 'carregando...' }</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
    </Head>
      <div>
        <div>
          {/* { !this.state.loadingPlayer && 
          <div className="preview">
            <i className="fas fa-spinner"></i>
          </div> } */}
          { this.state.anime != null && 
          <div className="player">
              <ReactNetflixPlayer
              // Vídeo Link - Just data is required
              src={`${(this.state.anime != null ? this.state.anime.file_sd : '')}`}
              // src={"http://videoinvalid"}
              title={`${(this.state.anime != null ? this.state.anime.nomeAnime : 'carregando...')}`}
              subTitle="Anime"
              titleMedia={`${(this.state.anime != null ? this.state.anime.nomeAnime : 'carregando...')}`}
              extraInfoMedia="Anime"
              // Text language of player
              playerLanguage="pt"
              // Action when the button X (close) is clicked
              backButton={() => {document.location.pathname = "/"}}
              // The player use the all viewport
              fullPlayer
              autoPlay
              startPosition={0}
              // The info of the next video action
              dataNext={{ title: 'Não existe um próximo vídeo.' }}
              // The action call when the next video is clicked
              onNextClick={() => {}}
              // The function call when a item in reproductionList is clicked
              onClickItemListReproduction={(id, playing) => {
                return {
                  id,
                  playing,
                };
              }}
              // The function is call when the video finish
              onEnded={() => {}}
              // The function is call when the video is playing (One time for frame)
              onTimeUpdate={() => {}}
              // Enable the orverlay when player is paused
              overlayEnabled
              // Enabled the auto clode controlls of player
              autoControllCloseEnabled
              // Style
              primaryColor="#ffffff"
              secundaryColor="#ffffff"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"

            // subtitleMedia="/teste.vtt"
          />
          </div>
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
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  }
}


export default Video