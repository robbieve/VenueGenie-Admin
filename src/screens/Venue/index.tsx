import React, { Component } from "react";
import { Spin, Empty, Table, message, Card } from 'antd'
import venue from '../../services/venue'

interface VenueDataSource {
    name: String,
    listingName: String,
    roomName: String,
    venueType: String,
    contactName: String,
    email: String,
    phoneNumber: String,
}

interface VunueProps {
   
}

interface VenueState {
        fetchingVenues: boolean,
        venuesDataSource: VenueDataSource[]
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Listing Name',
        dataIndex: 'listingName',
        key: 'listingName',
    },
    {
        title: 'Room Name',
        dataIndex: 'roomName',
        key: 'roomName',
    },
    {
        title: 'Venue Type',
        dataIndex: 'venueType',
        key: 'venueType',
    },
    {
        title: 'Contact Name',
        dataIndex: 'contactName',
        key: 'contactName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
]

class Venue extends Component<VunueProps, VenueState> {
    
    state: VenueState = {
        fetchingVenues: false,
        venuesDataSource: []
    }

    componentWillMount() {
        this.setState({ fetchingVenues: true })
        venue.listAdminVenues().then(resp => {
            const dataSource = resp.data.map(item => {
                return {
                    name: item.name,
                    listingName: item.listingName,
                    roomName: item.roomName,
                    contactName: item.contactName,
                    venueType: item.venueType,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                }
            })
            this.setState({ venuesDataSource: dataSource })
        }).catch(err => {
            message.error(err.error)
        }).finally(() => {
            this.setState({ fetchingVenues: false })
        })
    }

    render() {
        const { fetchingVenues, venuesDataSource } = this.state
        if (fetchingVenues) {
            return (
                <Spin size="large" />
            )
        }
        return (
            <Card>
                <Table 
                    dataSource={venuesDataSource} 
                    columns={columns}
                />
            </Card>
        )
    }
}

export default Venue;