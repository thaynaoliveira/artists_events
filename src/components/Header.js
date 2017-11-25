import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { getArtist, getEventsArtist, populateArtist } from "../Actions";

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {artistName: ""};
	}
	
	findArtist(e){
        e.preventDefault();
		let name = this.state.artistName;
		let cacheArtist = window.localStorage.getItem("ARTIST");
		let {dispatch} = this.props;
		if(cacheArtist){
			let artist = JSON.parse(cacheArtist);
			if(artist.name.toLowerCase() == name.toLowerCase()){
				dispatch(populateArtist());
			} else {
				dispatch(getArtist(name));
				dispatch(getEventsArtist(name));
			}
		} else {
			dispatch(getArtist(name));
			dispatch(getEventsArtist(name));
		}
	}

	setValue(field, e){
		this.setState({[field]: e.target.value});
	}
	
	checkKey(e){
        e.preventDefault();
        if(e.which === 13){ //se for a tecla enter
            this.findArtist(e);
        }
    }

    render() {
        return (
            <div className="background-header flex-300">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-sm-12 col-xs-12 text-center">
                        <div className="header-presentation">
                            <img src="/img/icon/white-logo.svg"/>
                            <span>The easiest way to find your favorite artists and their events!</span>
                        </div>
                        <div className="form-inline">
                            <div className="form-group m-10">
                                <input 
                                    type="text" 
                                    id="artistName" 
                                    placeholder="Type here the artist name"
                                    defaultValue={this.state.artistName}
                                    onChange={(e)=>this.setValue('artistName', e)}
                                    onKeyUp={(e)=>this.checkKey(e)}
                                    className="form-control"/>
                            </div>
                            <button className="btn btn-purple m-10" onClick={(e) => this.findArtist(e)}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
		artist: state.artist,
		events: state.events
    };
}

export default connect(mapStateToProps)(Header);











		