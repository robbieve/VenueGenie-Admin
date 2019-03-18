import React, { Component, FormEvent } from "react";
import { Card, Form, Input, Icon, Button, Row, Col, DatePicker, Upload, Select, message } from "antd";
import moment from "moment";
import { RcFile } from "antd/lib/upload/interface";

import vibeify from '../../services/vibeify'
import eventService from "../../services/event-service";
import { EventServiceModel } from "../../models/event-service";
import { SelectValue } from "antd/lib/select";
import eventPhotoGallery from "../../services/event-photo-gallery";

const Dragger = Upload.Dragger;
const Option = Select.Option;

interface CreateEventGalleryState {
    title: string;
    date: string;
    location: string;
    imgUrls: string[];
    photographers: EventServiceModel[];
    photographer: string;
    description: string;
}

interface CreateEventGalleryProps {

}

const dateFormat = 'YYYY-MM-DD';

class CreateEventGallery extends Component<CreateEventGalleryProps, CreateEventGalleryState> {
    state: CreateEventGalleryState = {
        title: '',
        date: moment().format(dateFormat),
        location: '',
        imgUrls: [],
        photographers: [],
        photographer: '',
        description: '',
    }

    componentWillMount() {
        eventService.list().then(resp => {
            this.setState({
                photographers: resp.data.filter(item => item.serviceType.name.toLowerCase() === 'photographer')
            })
        })
    }

    private handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { title, date, location, imgUrls, description, photographer } = this.state
        eventPhotoGallery.create({
            title,
            location,
            imgUrls,
            description,
            photographerId: photographer,
            date: moment(date).unix().toString(),
        }).then(_ => {
            message.success('Photo gallery was created!');
            this.clearForm();
            window.scrollTo(0, 0);
        }).catch(err => {
            message.error(err.error);
        })
    }

    private clearForm() {
        this.setState({
            title: '',
            date: moment().format(dateFormat),
            location: '',
            imgUrls: [],
            photographer: '',
            description: '',
        })
    }

    private onDateChange = (_: any, date: string) => {
        this.setState({ date })
    }

    private handlePhotographerChange = (value: SelectValue) => {
        this.setState({
            photographer: value as string,
        });
    }

    private beforeUpload = (file: RcFile, _: RcFile[]) => {
        vibeify.upload(file).then(resp => {
            this.setState({
                imgUrls: [...this.state.imgUrls, resp.data.url]
            })
        })
        return false
    }

    private photographerOptions() {
        return this.state.photographers.map(photographer => (
            <Option value={photographer.id}>{photographer.stageName}</Option>
        ))
    }

    render() {
        const { title, date, location, description } = this.state
        return (
            <Row>
                <Col xl={{ span: 12 }} lg={{ span: 14 }} md={{ span: 16 }} sm={{ span: 24 }}>
                    <h1>Create Event Photo Gallery</h1>
                    <p>Banjo narwhal health goth shoreditch shaman skateboard vaporware coloring book.</p>
                    <Card>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item label="Title">
                                <Input
                                    value={title}
                                    onInput={(e: any) => this.setState({ title: e.target.value })}
                                    prefix={<Icon type="branches" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Title" />
                            </Form.Item>
                            <Form.Item label="Location">
                                <Input
                                    value={location}
                                    onInput={(e: any) => this.setState({ location: e.target.value })}
                                    prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Location" />
                            </Form.Item>
                            <Form.Item label="Event Date">
                                <DatePicker
                                    defaultValue={moment(date, dateFormat)}
                                    onChange={this.onDateChange}
                                    placeholder="Event Date" />
                            </Form.Item>
                            <Form.Item label="Photographer">
                                <Select onChange={this.handlePhotographerChange}>
                                    {this.photographerOptions()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea
                                    value={description}
                                    onInput={(e: any) => this.setState({ description: e.target.value })}
                                    placeholder="Description" />
                            </Form.Item>
                            <Form.Item label="Event Images">
                                <Dragger
                                    beforeUpload={this.beforeUpload}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                </Dragger>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CreateEventGallery;