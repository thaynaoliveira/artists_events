import { EVENTS,
		 ARTIST } from './Actions';

const initialState = {
	artist: {},
	events: []
};

export default function config(state=initialState, action){

	switch(action.type){
		case ARTIST:
			setStorage(ARTIST, JSON.stringify(action.data))
			return Object.assign({}, state, {artist: action.data});
			break;
		case EVENTS:
			setStorage(EVENTS, JSON.stringify(action.data))
			return Object.assign({}, state, {events: action.data});
			break;
	}

    return state;
}

function setStorage(name, value){
	debugger
	window.localStorage.setItem(name, value);
}