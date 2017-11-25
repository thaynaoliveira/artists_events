import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import Header from './Header';
import MockupInfo from './MockupInfo';
import Artist from './Artist';

class Home extends Component {
	render() {
		return (
			<div>
				<Header/>
				{ this.props.artist.name ? 
					<Artist/> : 
					<MockupInfo/> 
				}
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