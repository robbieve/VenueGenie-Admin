import React, { Component, FormEvent } from 'react';
import { Form, Input, Select, Divider, Button, Alert, InputNumber } from 'antd';

import { VenueInformationState } from '../interface'
import {venueTypeOptions} from '../../../data/select'

import PlacesAutocomplete from 'react-places-autocomplete';

interface State {
    errors: string[];
}

interface Props {
    data: VenueInformationState;
    updateState: Function;
    next: Function;
}

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

    handleSelect = (address: string) => {
        this.props.updateState('fullAddress', address)
        this.props.updateState('address', address.split(',')[0])
    };

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
                        onInput={(e: any) => updateState('commission', e.target.value)} />
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
                <Form.Item label="Venue Type">
                    <Select
                        showSearch
                        placeholder="Select a venue type"
                        optionFilterProp="children"
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
                        onInput={(e: any) => updateState('googleReviewQty', e.target.value)} />
                </Form.Item>
                <Form.Item label="Google Review Rating">
                    <InputNumber
                        value={data.googleReviewRating}
                        onInput={(e: any) => updateState('googleReviewRating', e.target.value)} />
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
                    <Select >
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