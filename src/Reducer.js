import { EVENTS,
		 ARTIST } from './Actions';

const initialState = {
	artist: {},
	events: []
};

export default function config(state=initialState, action){

	switch(action.type){
		case ARTIST:
			return Object.assign({}, state, {artist: action.data});
			break;
		case EVENTS:
			return Object.assign({}, state, {events: action.data});
			break;
	}

    return state;
}