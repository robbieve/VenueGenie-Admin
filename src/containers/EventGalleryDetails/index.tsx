import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventGalleryDetails from '../../screens/EventGalleryDetails'
import { match } from 'react-router';
import { History } from 'history';

interface EventGalleryDetailsProps {
    match: match<any>;
    history: History;
}

class EventGalleryDetailsContainer extends Component<EventGalleryDetailsProps> {
    
    render () {
        return (
            <div>
              <EventGalleryDetails {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {
        
    };
};

const mapDispatchToProps = () => {
    return {
        
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventGalleryDetailsContainer);