import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import EventItem from './EventItem';
class Artist extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.artist.id !== this.props.artist.id && !$('#show-all-events').is(":visible")){
            $('#show-all-events').show();
        }
    }

    openFb(e){
		e.preventDefault();
		window.open(this.props.artist.facebook_page_url, 'fb_' + this.props.artist.id)
    }

    showAll(e){
        e.preventDefault();
        $('.event-hidden').removeClass('event-hidden');
        $('#show-all-events').hide();
    }

    render() {
        return (
            <div className="background-grey p-30">
                <div className="row">
                    <div className="col-md-offset-1 col-md-2 col-sm-4 col-xs-12 text-center purple-border-content">
                        <img src={this.props.artist.thumb_url} className="artist-avatar"/>
                        <div className="artist-info">
                            <p>{this.props.artist.name}</p>
                            {this.props.artist.facebook_page_url ? 
                                <div>
                                    <img src="/img/icon/facebook.png" alt="Open Facebook Page" onClick={(e) => this.openFb(e)}/>
                                    <span onClick={(e) => this.openFb(e)}>view profile</span>
                                </div>
                            : null }
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12 p-0">
                        {this.props.artist.upcoming_event_count > 0 && this.props.events ?
                            <div className="events">
                                <h4 className="txt-purple m-0">Upcoming Events ({this.props.artist.upcoming_event_count})</h4>
                                <div className="event-list">
                                    {this.props.events.map( (item, index) => 
                                        <EventItem item={item} key={item.id} index={index} />
                                    )}
                                </div>
                                {this.props.artist.upcoming_event_count > 10 ? 
                                    <div>
                                        <button className="btn btn-purple btn-block btn-show-all" id="show-all-events" onClick={(e) => this.showAll(e)}>Show all</button>
                                    </div>
                                : null }
                            </div>
                            :
                            <div className="events">
                                <h4 className="m-0">No events found.</h4>
                            </div>
                        }
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

export default connect(mapStateToProps)(Artist);