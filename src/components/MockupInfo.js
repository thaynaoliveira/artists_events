import React, { Component } from 'react';

export default class MockupInfo extends Component {
    render() {
        return (
            <div className="row mockup-info">
                <div className="col-md-offset-1 col-md-3 col-sm-offset-1 col-sm-3 col-xs-12">
                    <div className="flex-250">
                        <img src="../img/mockup.png" width="100%"/>
                    </div>
                </div>
                <div className="col-md-7 col-sm-8 col-xs-12">
                    <div className="flex-250">
                        <p>Want to know about your favorite artists? What about their events?</p>
                        <span>Here on <b>Artists and Events</b> you find everything easily! You just need to fill the form above and have fun!</span>
                    </div>
                </div>
            </div>
        );
    }
}












		