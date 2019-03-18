import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventGalleries from '../../screens/EventGalleries'

class EventGalleriesContainer extends Component {
    
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