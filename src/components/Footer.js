import React, { Component } from 'react';

export default class Footer extends Component {

    constructor(props){
        super(props);
        this.state = {devs:[
            {name: 'Thayná Oliveira',
            img: 'https://avatars0.githubusercontent.com/u/23365403?s=400&u=2d3e91dec707940df3c369176e642f5bbf5c4f45&v=4',
            linkedin: 'https://www.linkedin.com/in/thayn%C3%A1-oliveira-59b984115/',
            git: 'https://github.com/thaynaoliveira'},
            {name: 'Ruben Dessimoni',
            img: 'https://media.licdn.com/media/AAEAAQAAAAAAAAIJAAAAJGUyOWQwNjc1LTk4ZjQtNGJhOC1hMzNmLTg3MjFmMWY3Njc2Mw.jpg',
            linkedin: 'https://www.linkedin.com/in/ruben-cesar-dessimoni-ba85b435/',
            git: 'https://github.com/rubendess'},
            {name: 'Guilherme Rosendo',
            img: 'https://avatars0.githubusercontent.com/u/2196929?s=400&v=4',
            linkedin: 'https://www.linkedin.com/in/guilhermerosendo/',
            git: 'https://github.com/grosendo'}
        ]}
    }

    openGit(e, url){
        e.preventDefault();
        window.open(url, 'git');
    }

    openLinkein(e, url){
        e.preventDefault();
        window.open(url, 'lindekin');
    }

    render() {
        return (
            <div className="row footer">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="text-center">
                        {this.state.devs.map((item, index)=>
                            <div className="inline" key={`dev-${index}`}>
                                <div className="inline">
                                    <img src={item.img}/>
                                </div>
                                <div className="inline m-10 text-left">
                                    <p className="m-0">{item.name}</p>
                                    <span className="cursor" onClick={(e) => this.openLinkein(e, item.linkedin)}>LinkedIn | </span> 
                                    <span className="cursor" onClick={(e) => this.openGit(e, item.git)}>GitHub</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}












		