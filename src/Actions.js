import request from 'axios';

export const ARTIST = 'ARTIST';
export const EVENTS = 'EVENTS';

const url = 'https://rest.bandsintown.com/';
const app_id = 'test';

export function getArtist(name){
    let artistName = adjustName(name);

    return dispatch => { request.get( url + 'artists/' + artistName + '?app_id=' + app_id)
                        .then( response =>{ 
                        	dispatch(setReducer(ARTIST, response.data)); 
                        });
    }
}

export function getEventsArtist(name){
    let artistName = adjustName(name);
    
    return dispatch => { request.get( url + 'artists/' + artistName + '/events?app_id=' + app_id)
                        .then( response =>{ 
                        	dispatch(setReducer(EVENTS, response.data)); 
                        });
    }
}

export function setReducer(type, data){
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