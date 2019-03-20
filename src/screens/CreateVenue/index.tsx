import React, { Component } from 'react';
import { Row, Col, Steps, Divider } from 'antd';

import CreateVenueInformationSection from './_sections/CreateVenueInformationSection'
import AddAmenitySection from './_sections/AddAmenitySection'
import VenueDetailsSection from './_sections/VenueDetailsSection'

import { VenueInformationState } from './interface';

const Step = Steps.Step;

const
    INFO_STEP = 'INFO_STEP',
    AMENITIES_STEP = 'AMENITIES_STEP',
    VENUEDETAILS_STEP = 'VENUEDETAILS_STEP'

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
    eventType: {
        wedding: false,
        corporate: false,
        social: false
    },
    googleReviewRating: 0,
    googleReviewQty: 0,
    address: '',
    city: '',
    neighbourhood: '',
    fullAddress: '',
    iGuideLink: '',
    standingCapacity: 0,
    seatedCapacity: 0,
    minCapacity: 0,
    rentalFee: 0,
    lookFeels: [],
    cuisineOptions: [],
    foodDrinkOptions: [],
    amenities: [],
    images: [],
    featuredImageUrl: '',
    lunchPrice: {
        buyout: 0,
        perPerson: 0,
    },
    dinnerPrice: {
        buyout: 0,
        perPerson: 0,
    },
    dishes: [],
    notes: ''
}

interface State {
    step: string,
    informationState: VenueInformationState;
}

const infoStepTitles = {
    INFO_STEP: 'In Progress',
    AMENITIES_STEP: 'Finished',
    VENUEDETAILS_STEP: 'Finished',
}

const amenityStepTitles = {
    INFO_STEP: 'Waiting',
    AMENITIES_STEP: 'In Progress',
    VENUEDETAILS_STEP: 'Finished',
}
const detailsStepTitles = {
    INFO_STEP: 'Waiting',
    AMENITIES_STEP: 'Waiting',
    VENUEDETAILS_STEP: 'In Progress',
}

class CreateVenue extends Component {
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
    displayTitles = (infoTitles: object, key_: string ): string => {
        
        Object.entries(infoTitles).forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            
            if (key_ === key) {
                return value
            }
          })
        return ''
    }
    private displaySteps() {
        switch (this.state.step) {
            case INFO_STEP:
                return (
                    <CreateVenueInformationSection
                        data={this.state.informationState}
                        updateState={this.updateInfoState}
                        next={() => this.setState({step: AMENITIES_STEP})} />
                )
            case AMENITIES_STEP:
                return (
                    <AddAmenitySection 
                        updateState={this.updateInfoState}
                        prev={() => this.setState({step: INFO_STEP})}
                        next={() => this.setState({step: VENUEDETAILS_STEP})}
                    />
                )
            
            case VENUEDETAILS_STEP:
                return (
                    <VenueDetailsSection 
                        updateState={this.updateInfoState}
                        prev={() => this.setState({step: AMENITIES_STEP})}
                        data={this.state.informationState}
                    />
                )
        }
    }

    render() {
        
        return (
            <Row gutter={16}>
                <Col span="5">
                    <Steps direction="vertical" size="small" current={0}>
                        <Step title={this.displayTitles(infoStepTitles, this.state.step)} description="Venue information." />
                        <Step title="Waiting" description="Venue amenities" />
                        <Step title="Waiting" description="Venue details" />
                    </Steps>
                </Col>
                <Col span={this.state.step === INFO_STEP? "13" : "8"} style={{ background: 'white', padding: 16 }}>
                    {this.displaySteps()}
                </Col>
            </Row>
        );
    }
}

export default CreateVenue;