import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { getArtist, getEventsArtist, setReducer } from "../Actions";

class Home extends Component {

	constructor(props){
        super(props);
        this.state = {artistName: ""};
	}
	
	findArtist(e){
		let name = this.state.artistName;
		let cacheArtist = window.localStorage.getItem("ARTIST");
		let {dispatch} = this.props;
		debugger
		if(cacheArtist){
			let artist = JSON.parse(cacheArtist);
			if(artist.name == name){
				//dispatch(setReducer("ARTIST", cacheArtist));
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
			<div className="text-center">
				<input 
					type="text" 
					id="artistName" 
					placeholder="Type here the artist name"
					defaultValue={this.state.artistName}
					onChange={(e)=>this.setValue('artistName', e)}
					onKeyUp={(e)=>this.checkKey(e)}
					className="form-control"/>
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

export default connect(mapStateToProps)(Home);