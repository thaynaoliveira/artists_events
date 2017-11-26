import request from 'axios';

export const ARTIST = 'ARTIST';
export const EVENTS = 'EVENTS';
export const ARTIST_ERROR = 'ARTIST_ERROR';
export const EVENTS_ERROR = 'EVENTS_ERROR';

const url = 'https://rest.bandsintown.com/';
const app_id = 'artistsandevents';

export function getArtist(artistName){
    return dispatch => { request.get( url + 'artists/' + artistName + '?app_id=' + app_id)
                        .then( response =>{ 
                            if(response.data.name){
                                setStorage(ARTIST, JSON.stringify(response.data))
                                dispatch(setReducer(ARTIST, response.data)); 
                                window.localStorage.removeItem('EVENTS');
                                if(response.data.upcoming_event_count > 0){
                                    dispatch(getEventsArtist(response.data.name));
                                }
                            } else {
                                dispatch(setReducer(ARTIST_ERROR, true)); 
                                dispatch(setReducer(ARTIST, {})); 
                            }
                        })
                        .catch( error => {
                            dispatch(setReducer(ARTIST_ERROR, true)); 
                            dispatch(setReducer(ARTIST, {})); 
                        });
    }
}

export function getEventsArtist(artistName){    
    return dispatch => { request.get( url + 'artists/' + artistName + '/events?app_id=' + app_id)
                        .then( response =>{ 
                            if(response.data.length > 0){
                                setStorage(EVENTS, JSON.stringify(response.data));
                                dispatch(setReducer(EVENTS, response.data)); 
                            } else {
                                dispatch(setReducer(EVENTS, [])); 
                                dispatch(setReducer(EVENTS_ERROR, true)); 
                            }
                        })
                        .catch( error => {
                            dispatch(setReducer(EVENTS, [])); 
                            dispatch(setReducer(EVENTS_ERROR, true)); 
                        });
;
    }
}

export function populateArtist(){
    let obj = new Object();
    obj.artist = window.localStorage.getItem(ARTIST);
    obj.events = window.localStorage.getItem(EVENTS);
    return dispatch => {
        dispatch(setReducer(ARTIST, JSON.parse(obj.artist))); 
        dispatch(setReducer(EVENTS, JSON.parse(obj.events))); 
    }
}

export function setReducer(type, data){
	return{
		type: type,
		data: data
	}
}

function setStorage(name, value){
	window.localStorage.setItem(name, value);
}