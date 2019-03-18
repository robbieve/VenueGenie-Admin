import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from '../../screens/Dashboard'

class DashboardContainer extends Component {
    
    render () {
        return (
            <div>
              <Dashboard {...this.props}/>
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
)(DashboardContainer);