import React, { Component, FormEvent } from 'react';
import { Form, Input, Select, Divider } from 'antd';

class CreateVenueInformationSection extends Component {
    private handleSubmit = (e: FormEvent) => {
        console.log({ e })
    }

    render() {
        return (
            <Form
                onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Room Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Listing Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Contact Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Commission">
                    <Input />
                </Form.Item>
                <Form.Item label="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone Number">
                    <Input />
                </Form.Item>
                <Form.Item label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Venue Type">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                    >
                        <Select.Option value="jack">Jack</Select.Option>
                        <Select.Option value="lucy">Lucy</Select.Option>
                        <Select.Option value="tom">Tom</Select.Option>
                    </Select>
                </Form.Item>
                <Divider />
                <h3>Google Review</h3>
                <Form.Item label="Phone Number">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone Number">
                    <Input />
                </Form.Item>
            </Form>
        );
    }
}

export default CreateVenueInformationSection;