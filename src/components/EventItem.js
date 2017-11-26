import React, { Component } from 'react';

export default class Artist extends Component {
    
    handleDate(d){
        let date = new Date(d);
        return this.getMonth(date.getMonth()+1) + ', ' + date.getDate();
    }

    getMonth(m){
        switch(m){
            case 1: return 'January';
            case 2: return 'February';
            case 3: return 'March';
            case 4: return 'April';
            case 5: return 'May';
            case 6: return 'June';
            case 7: return 'July';
            case 8: return 'August';
            case 9: return 'September';
            case 10: return 'October';
            case 11: return 'November';
            case 12: return 'December';
        }
        return m
    }

    openMaps(e, venue){
        let url = 'https://www.google.com.br/maps/search/' + venue.latitude + ',+' + venue.longitude;
        window.open(url, 'maps')
    }

    openTickets(e, item){
        window.open(item.offers[0].url, 'tickets' + item.id)
    }

    render() {
        return (
            <div className={`event-item ${this.props.index > 10 ? 'event-hidden' : ''}`}>
                <div>
                <span className="date-border">{this.handleDate(this.props.item.datetime)}</span>
                <span>{this.props.item.venue.name} - {this.props.item.venue.city}, {this.props.item.venue.region ? this.props.item.venue.region + '/' : '' }{this.props.item.venue.country}
                    <img src="/img/icon/maps.png" width="22px" className="cursor" onClick={(e) => this.openMaps(e, this.props.item.venue)} />
                </span>
                </div>
                { this.props.item.offers.length ? 
                    <button className="btn btn-purple pull-right btn-tickets" onClick={(e) => this.openTickets(e, this.props.item)} disabled={this.props.item.offers[0].status !== 'available'}>Buy tickets</button>
                : null}
            </div>
        );
    }
}