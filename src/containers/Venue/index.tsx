import React, { Component } from 'react'
import { connect } from 'react-redux'
import Venue from '../../screens/Venue'
import {
    fetchVenues,
} from '../../actions/venue'

interface Props {
    fetchVenues: any,
    venues: any
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
        venues: state.venue.venues,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchVenues: () => {
            return dispatch(fetchVenues())
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VenueContainer);