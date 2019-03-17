import React, { Component } from 'react';
import { Row, Col, Steps, Divider } from 'antd';

import CreateVenueInformationSection from './_sections/CreateVenueInformationSection'
import { VenueInformationState } from './interface';

const Step = Steps.Step;

const
    INFO_STEP = 'INFO_STEP',
    AMENITIES_STEP = 'AMENITIES_STEP'


const initialInformationState = {
    name: '',
    listingName: '',
    commission: 0,
    roomName: '',
    email: '',
    phoneNumber: '',
    phoneExt: '',
    contactName: '',
    description: '',
    venueType: '',
    eventType: '',
    googleReviewRating: 0,
    googleReviewQty: 0,
    address: '',
    city: '',
    neighbourhood: '',
    fullAddress: '',
}


interface State {
    step: string,
    informationState: VenueInformationState;
}

class CreateVenueView extends Component {
    state: State = {
        step: INFO_STEP,
        informationState: initialInformationState,
    }

    updateInfoState = (key: string, value: string | number) => {
        const informationState = { ...this.state.informationState, [key]: value }
        this.setState({
            informationState
        })
    }

    private displaySteps() {
        switch (this.state.step) {
            case INFO_STEP:
                return (
                    <CreateVenueInformationSection
                        data={this.state.informationState}
                        updateState={this.updateInfoState}
                        next={() => this.setState({step: 2})} />
                )
            case AMENITIES_STEP:
        }
    }

    render() {
        return (
            <Row gutter={16}>
                <Col span="5">
                    <Steps direction="vertical" size="small" current={0}>
                        <Step title="In Progress" description="Venue information." />
                        <Step title="Waiting" description="Venue amenities" />
                        <Step title="Waiting" description="This is a description." />
                    </Steps>
                </Col>
                <Col span="13" style={{ background: 'white', padding: 16 }}>
                    {this.displaySteps()}
                </Col>
            </Row>
        );
    }
}

export default CreateVenueView;