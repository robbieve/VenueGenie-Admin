import React, { Component } from 'react'
import { connect } from 'react-redux'
import Venue from '../../screens/Venue'


interface Props {
    
}


class VenueContainer extends Component<Props> {
    
    render () {
        return (
            <div>
              <Venue {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VenueContainer);