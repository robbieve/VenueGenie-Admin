import React, { Component, FormEvent } from 'react';
import { Form, Input, Select, Divider, Button, Alert, InputNumber, Row, Col, Switch } from 'antd';
import Grid from 'antd/lib/card/Grid';
import { VenueInformationState } from '../interface'
import { EventType } from '../../../models/venue'
import {venueTypeOptions, cityOptions} from '../../../data/select'

import PlacesAutocomplete from 'react-places-autocomplete';

interface State {
    errors: string[];
}

interface Props {
    data: VenueInformationState;
    updateState: Function;
    next: Function;
}
type eventType = keyof EventType

class CreateVenueInformationSection extends Component<Props> {
    state: State = {
        errors: []
    }

    private handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        this.validate()
            .then(() => this.props.next())
            .catch(errors => {
                this.setState({ errors })
            })
    }

    private validate(): Promise<boolean> {
        let errors = [];
        const data = this.props.data
        if (data.name === '') {
            errors.push('name is required')
        }
        if (data.roomName === '') {
            errors.push('room name is required')
        }
        if (data.listingName === '') {
            errors.push('listing name is required')
        }
        if (data.contactName === '') {
            errors.push('contact name is required')
        }
        if (data.commission === 0) {
            errors.push('commission is required')
        }
        if (data.email === '') {
            errors.push('email is required')
        }
        if (data.phoneNumber === '') {
            errors.push('phone number is required')
        }
        if (data.venueType === '') {
            errors.push('venue type is required')
        }
        if (data.googleReviewQty === 0) {
            errors.push('review qty is required')
        }
        if (data.googleReviewRating === 0) {
            errors.push('review rating is required')
        }
        if (data.fullAddress === '') {
            errors.push('full address is required')
        }
        if (data.address === '') {
            errors.push('address is required')
        }
        if (data.city === '') {
            errors.push('city is required')
        }

        if (errors.length === 0) {
            return Promise.resolve(true)
        }
        return Promise.reject(errors)
    }
    handleChange = (value: any, name: string) => {
        const { updateState } = this.props
        updateState(name, value)
    }
    handleSelect = async (address: string) => {
        await this.props.updateState('address', address.split(',')[0])
        this.props.updateState('fullAddress', address)
    };
    onChangeSwitch = (checked: boolean, key: eventType) => {
        const { data: { eventType }, updateState} = this.props
        eventType[key] = checked
        updateState('eventType', eventType)
    }
    render() {
        const { data, updateState } = this.props
        return (
            <Form
                onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                    <Input
                        value={data.name}
                        onInput={(e: any) => updateState('name', e.target.value)} />
                </Form.Item>
                <Form.Item label="Room Name">
                    <Input
                        value={data.roomName}
                        onInput={(e: any) => updateState('roomName', e.target.value)} />
                </Form.Item>
                <Form.Item label="Listing Name">
                    <Input
                        value={data.listingName}
                        onInput={(e: any) => updateState('listingName', e.target.value)} />
                </Form.Item>
                <Form.Item label="Contact Name">
                    <Input
                        value={data.contactName}
                        onInput={(e: any) => updateState('contactName', e.target.value)} />
                </Form.Item>
                <Form.Item label="Commission">
                    <InputNumber
                        value={data.commission}
                        onChange={(value: any) => updateState('commission', value)} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input
                        value={data.email}
                        onInput={(e: any) => updateState('email', e.target.value)} />
                </Form.Item>
                <Form.Item label="Phone Number">
                    <Input
                        value={data.phoneNumber}
                        onInput={(e: any) => updateState('phoneNumber', e.target.value)} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input.TextArea
                        value={data.description}
                        onInput={(e: any) => updateState('description', e.target.value)} />
                </Form.Item>
                
                <Form.Item label="Event Type">
                    <Row style={{margin: '20px 10px'}}>
                        <Col lg={{ span: 18, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>Social Event</span></Col>
                        <Col lg={{ span: 3, offset: 1 }}>
                        <Switch defaultChecked={false} onChange={(checked) => this.onChangeSwitch(checked, 'social')} />
                        </Col>
                    </Row>
                    <Row style={{margin: '20px 10px'}}>
                        <Col lg={{ span: 18, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>Wedding Event</span></Col>
                        <Col lg={{ span: 3, offset: 1 }}>
                        <Switch defaultChecked={false} onChange={(checked) => this.onChangeSwitch(checked, 'wedding')} />
                        </Col>
                    </Row>
                    <Row style={{margin: '20px 10px'}}>
                        <Col lg={{ span: 18, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>Corporate Event</span></Col>
                        <Col lg={{ span: 3, offset: 1 }}>
                        <Switch defaultChecked={false} onChange={(checked) => this.onChangeSwitch(checked, 'corporate')} />
                        </Col>
                    </Row>
                </Form.Item>
               
                
                <Form.Item label="Venue Type">
                    <Select
                        showSearch
                        placeholder="Select a venue type"
                        optionFilterProp="children"
                        onChange={(value) => this.handleChange(value, 'venueType')}
                    >
                        {venueTypeOptions.map(opt => (
                            <Select.Option value={opt.value}>{opt.label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Divider />
                <h3>Google Review</h3>
                <Form.Item label="Google Review Qty">
                    <InputNumber
                        value={data.googleReviewQty}
                        onChange={(value: any) => updateState('googleReviewQty', value)} />
                </Form.Item>
                <Form.Item label="Google Review Rating">
                    <InputNumber
                        value={data.googleReviewRating}
                        onChange={(value: any) => updateState('googleReviewRating', value)} />
                </Form.Item>
                <Divider />
                <h3>Location</h3>
                <Form.Item label="Address">
                    <PlacesAutocomplete
                        value={data.address}
                        onChange={(address: string) => updateState('address', address)}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion: any) => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Form.Item>
                <Form.Item label="City">
                    <Select
                        showSearch
                        placeholder="Select a City"
                        optionFilterProp="children"
                        onChange={(value) => this.handleChange(value, 'city')}
                    >
                        {cityOptions.map(opt => (
                            <Select.Option value={opt.value}>{opt.label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {this.state.errors.map(err => (
                    <Alert style={{marginBottom: 16}} key={err} message={err} type="error" />
                ))}
                <Form.Item>
                    <Button type="primary" htmlType="submit">Next</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default CreateVenueInformationSection;