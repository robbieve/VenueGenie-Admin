import React, { Component } from 'react';
import { Row, Col, Steps, Divider } from 'antd';

import CreateVenueInformationSection from './_sections/CreateVenueInformationSection'

const Step = Steps.Step;

const
    INFO_STEP = 'INFO_STEP',
    AMENITIES_STEP = 'AMENITIES_STEP'


interface State {
    step: string
}

class CreateVenueView extends Component {
    state: State = {
        step: INFO_STEP
    }

    private displaySteps() {
        switch (this.state.step) {
            case INFO_STEP:
                return  <CreateVenueInformationSection />
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