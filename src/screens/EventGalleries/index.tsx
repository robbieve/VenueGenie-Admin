import React, { Component } from "react";
import { EventPhotoGalleryModel } from '../../models/event-photo-gallery'
import { Spin, Empty, Table, message, Card } from 'antd'
import eventPhotoGallery from '../../services/event-photo-gallery'

interface GalleryDataSource {
    key: string;
    title: string;
    photographer: string;
    location: string;
    date: string;
}

interface EventGalleriesState {
    fetchingGalleries: boolean;
    galleriesDataSource: GalleryDataSource[];
}

interface EventGalleriesProps {

}

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Photographer',
        dataIndex: 'photographer',
        key: 'photographer',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
]

class EventGalleries extends Component<EventGalleriesProps, EventGalleriesState> {
    state: EventGalleriesState = {
        fetchingGalleries: false,
        galleriesDataSource: []
    }

    componentWillMount() {
        this.setState({ fetchingGalleries: true })
        eventPhotoGallery.list().then(resp => {
            const dataSource = resp.data.map(item => {
                return {
                    key: item.id,
                    title: item.title,
                    location: item.location,
                    date: item.date,
                    photographer: item.photographer ? item.photographer.stageName : 'None',
                }
            })
            this.setState({ galleriesDataSource: dataSource })
        }).catch(err => {
            message.error(err.error)
        }).finally(() => {
            this.setState({ fetchingGalleries: false })
        })
    }

    render() {
        const { fetchingGalleries, galleriesDataSource } = this.state
        if (fetchingGalleries) {
            return (
                <Spin size="large" />
            )
        }
        if (galleriesDataSource.length === 0) {
            return (
                <Empty />
            )
        }
        return (
            <Card>
                <Table dataSource={galleriesDataSource} columns={columns} />
            </Card>
        )
    }
}

export default EventGalleries;