import Head from 'next/head'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useState } from 'react';

const Pagina = ({animes, error}) => {
      if (error) {
        return <div>An error occured: {error.message}</div>;
      }
      return (
        <div className="container">
          <Head>
            <title>NekoWatch</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <div className="scrollAnime">
            <h1 className="title">Animes</h1>
            {animes.animes.map(anime => (
            <a href={`/anime/${anime.idAnime}`}>
                <div 
                className="anime" key={anime.name}>
                <div className="photo">
                    <img src={anime.photo}/>  
                </div>
                </div>
            </a>
            ))}
        </div>
          
    
          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
              background: #151515;
            }
    
            * {
              box-sizing: border-box;
            }
    
            .title{
              color: #fff;
              position: relative;
              left: 48px;
            }
    
            .scrollAnime{
              width: calc(100% - 20px);
              height: auto;
              overflow: hidden;
              opacity: 1;
              transform: translate3d(0px, 0px, 0px);
              margin: 10px;
              position: relative;
              left: -20px;
            }
            
            .anime{
              width: calc(20% + 120px);
              height: 200px;
              display: inline-block;
              overflow: hidden;
              transform: scale(0.8);
              margin-left: -230px;
              position: relative;
              left: 230px;
              border-radius: 4px;
              cursor: pointer;
            }
    
            .anime .photo{
              position: absolute;
              overflow: hidden;
            }
    
            .anime img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
    
          `}</style>
        </div>
      )
}

Pagina.getInitialProps = async ({ctx, query}) => {
  try {
    const res = await axios.get(`http://localhost:3333/page/${query.idPagina}`);
    const animes = res.data;
    return { animes };
  } catch (error) {
    return { error };
  }
};

export default Pagina