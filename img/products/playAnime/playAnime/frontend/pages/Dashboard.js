import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          animeDestaque: null
        };
      }
      componentDidMount(){
        
      }
      render() {
        return <div className="destaqueBoo">
                <div className="next">
                    <img className="logo" src="./logo.png"></img>
                </div>
                <img src="./heroBack.jpg"></img>
                <style jsx global>{`
                    .destaqueBoo{
                        width: 100%;
                        position: relative;
                        height: 90vh;
                        overflow: hidden;
                    }

                    .destaqueBoo::after{
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0px;
                        left: 0px;
                        background: #402968a3;
                    }

                    .destaqueBoo img{
                        width: 100%;
                        object-fit: cover;
                        height: 100%;
                    }

                    .destaqueBoo .next{
                        position: absolute;
                        top: 30%;
                        left: 50px;
                        color: #fff;
                        z-index: 100;
                    }

                    .logo{
                        position: relative;
                        width: 120px !important;
                        object-fit: cover;
                        top: -20vh;
                    }

                    .proximoEp{
                        width: 400px;
                        height: 220px;
                        background: rgba(0,0,0,0.4);
                        border: 2px solid #fff;
                        border-radius: 4px;
                    }

                    .proximoEp img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                `}</style>
        </div>
    }
}
    