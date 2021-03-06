import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventGalleries from '../../screens/EventGalleries'
import { History } from 'history';

interface EventGalleriesContainerProps {
    history: History
}

class EventGalleriesContainer extends Component<EventGalleriesContainerProps> {
    
    render () {
        return (
            <div>
              <EventGalleries {...this.props}/>
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
)(EventGalleriesContainer);