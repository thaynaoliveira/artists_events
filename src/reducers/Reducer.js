import { EVENTS,
		 ARTIST,
		 ARTIST_ERROR,
		 EVENTS_ERROR } from '../actions/ArtistActions';

const initialState = {
	artist: {},
	events: [],
	artistError: false,
	eventsError: false
};

export default function config(state=initialState, action){

	switch(action.type){
		case ARTIST:
			return Object.assign({}, state, {artist: action.data});
			break;
		case EVENTS:
			return Object.assign({}, state, {events: action.data});
			break;
		case ARTIST_ERROR:
			return Object.assign({}, state, {artistError: action.data});
			break;
		case EVENTS_ERROR:
			return Object.assign({}, state, {eventsError: action.data});
			break;
}

    return state;
}