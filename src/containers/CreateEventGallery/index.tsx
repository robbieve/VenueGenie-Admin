import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateEventGallery from '../../screens/CreateEventGallery'
import { History } from 'history';

interface CreateEventGalleryContainer {
    history: History;
}

class CreateEventGalleryContainer extends Component<CreateEventGalleryContainer> {
    
    render () {
        return (
            <div>
              <CreateEventGallery {...this.props}/>
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
)(CreateEventGalleryContainer);