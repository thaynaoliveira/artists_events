import request from 'axios';

export const ARTIST = 'ARTIST';
export const EVENTS = 'EVENTS';

const url = 'https://rest.bandsintown.com/';
const app_id = 'test';

export function getArtist(name){
    let artistName = adjustName(name);

    return dispatch => { request.get( url + 'artists/' + artistName + '?app_id=' + app_id)
                        .then( response =>{ 
                            setStorage(ARTIST, JSON.stringify(response.data))
                        	dispatch(setReducer(ARTIST, response.data)); 
                        });
    }
}

export function getEventsArtist(name){
    let artistName = adjustName(name);
    
    return dispatch => { request.get( url + 'artists/' + artistName + '/events?app_id=' + app_id)
                        .then( response =>{ 
                            setStorage(EVENTS, JSON.stringify(response.data))
                        	dispatch(setReducer(EVENTS, response.data)); 
                        });
    }
}

export function populateArtist(){
    let obj = new Object();
    obj.artist = window.localStorage.getItem(ARTIST);
    obj.events = window.localStorage.getItem(EVENTS);
    return dispatch => {
        dispatch(setReducer(ARTIST, obj.artist)); 
        dispatch(setReducer(EVENTS, obj.events)); 
    }
}

function setReducer(type, data){
	return{
		type: type,
		data: data
	}
}

function adjustName(name){
    name = name.replace(/\s+/, ""); //Removing spaces
    name = name.toLowerCase();
    return name;
}

function setStorage(name, value){
	window.localStorage.setItem(name, value);
}