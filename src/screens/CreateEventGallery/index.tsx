import React, { Component, FormEvent } from "react";
import { Card, Form, Input, Icon, Button, Row, Col, DatePicker, Upload } from "antd";
import moment from "moment";
import { RcFile } from "antd/lib/upload/interface";

import vibeify from '../../services/vibeify'

const Dragger = Upload.Dragger;

interface CreateEventGalleryState {
    title: string;
    date: string;
    location: string;
    imgUrls: string[];
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
    }

    private handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { title, date, location, imgUrls } = this.state
        console.log({ title, date, location, imgUrls })
    }

    private onDateChange = (_: any, date: string) => {
        this.setState({ date })
    }

    private beforeUpload = (file: RcFile, _: RcFile[]) => {
        vibeify.upload(file).then(resp => {
            this.setState({
                imgUrls: [...this.state.imgUrls, resp.data.url]
            })
        })
        return false
    }

    render() {
        const { title, date, location } = this.state
        return (
            <Row>
                <Col xl={{ span: 12 }} lg={{ span: 14 }} md={{ span: 16 }} sm={{ span: 24 }}>
                    <h1>Create Event Photo Gallery</h1>
                    <p>Banjo narwhal health goth shoreditch shaman skateboard vaporware coloring book.</p>
                    <Card>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                <Input
                                    value={title}
                                    onInput={(e: any) => this.setState({ title: e.target.value })}
                                    prefix={<Icon type="branches" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Title" />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={location}
                                    onInput={(e: any) => this.setState({ location: e.target.value })}
                                    prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Location" />
                            </Form.Item>
                            <Form.Item>
                                <DatePicker
                                    defaultValue={moment(date, dateFormat)}
                                    onChange={this.onDateChange}
                                    placeholder="Event Date" />
                            </Form.Item>
                            <Form.Item>
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