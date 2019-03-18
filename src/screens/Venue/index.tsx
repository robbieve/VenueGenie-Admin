import React, { Component } from "react";

interface Props {
    fetchVenues: any,
    venues: any
}

class Venue extends Component<Props> {
    componentDidMount() {
        const { fetchVenues } = this.props
        fetchVenues()
    }
    render() {
        const { venues } = this.props
        return (
            <div><h1>Venue!</h1></div>
        )
    }
}

export default Venue;