import React, { Component } from 'react'
import { connect } from 'react-redux'
import Venue from '../../screens/Venue'

class VenueContainer extends Component {
    
    render () {
        return (
            <div>
              <Venue {...this.props}/>
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
)(VenueContainer);