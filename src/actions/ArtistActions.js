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
                                saveArtistOnCache(response.data, artistName);
                                dispatch(setReducer(ARTIST, response.data));
                                removeStorage(EVENTS);
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
    }
}

function saveArtistOnCache(artist, searchedName){
    artist["searchedName"] = searchedName;
    setStorage(ARTIST, JSON.stringify(artist))
}

export function populateArtist(){
    return dispatch => {
        dispatch(setReducer(ARTIST, getJSONStorage(ARTIST)));
        dispatch(setReducer(EVENTS, getJSONStorage(EVENTS)));
    }
}

export function setReducer(type, data){
	return{
		type: type,
		data: data
	}
}

export function setStorage(name, value){
	window.localStorage.setItem(name, value);
}

export function getStorage(name){
    return window.localStorage.getItem(name);
}

export function getJSONStorage(name){
    let item = getStorage(name);
    if(item){
        return JSON.parse(item);
    }

    return {}
}

export function removeStorage(name){
    window.localStorage.removeItem(name);
}