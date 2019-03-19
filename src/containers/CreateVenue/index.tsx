import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateVenue from '../../screens/CreateVenue'

interface Props {
    
}


class CreateVenueContainer extends Component<Props> {
    
    render () {
        return (
            <div>
              <CreateVenue {...this.props}/>
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
)(CreateVenueContainer);