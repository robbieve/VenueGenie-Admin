import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateEventGallery from '../../screens/CreateEventGallery'

class CreateEventGalleryContainer extends Component {
    
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