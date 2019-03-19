import React, { Component, FormEvent } from 'react';
import { Form, Input, Select, Divider, Button, Alert, InputNumber, Row, Col, Switch, Icon } from 'antd';
import { VenueOptionItem } from '../../../models/venue'
import Grid from 'antd/lib/card/Grid';


interface State {
  amenityDummies: VenueOptionItem[],
  amenities: String[],
  addingAmenity: VenueOptionItem,
}

interface Props {
  updateState: Function;
  next: Function;
}

class AddAmenitySection extends Component<Props> {

  state: State = {
    amenityDummies: [
      {
        name: 'A/V Equipment',
        id: 'a120c489-b858-4cba-a8e5-dd19c18a7568'
      },
      {
        name: 'Dance Floor',
        id: 'deddd2b4-1c4f-4429-9957-a67b1122badd'
      },
      {
        name: 'Furniture',
        id: '478683e5-bfff-4623-841c-315e81ebb45b'
      },
      {
        name: 'Handicap Access',
        id: '30823a10-9401-424d-ae63-deafa645d094'
      },
      {
        name: 'Private Bar',
        id: 'b3e07997-f93f-451f-8da4-03eab33f4d7d'
      },
      {
        name: 'Wifi',
        id: '81e0771d-7be0-45a1-b7d9-5faf3dae93d3'
      },
      {
        name: 'Free Parking',
        id: 'c0c71311-ba5e-44bd-89af-eb5925635436'
      },
    ],
    amenities: [

    ],
    addingAmenity: {
      name: '',
      id: ''
    }
  }
  private handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.next()
  }
  addAmenity = (checked: Boolean, id: String) => {
    
    if (checked === true) {
      const { amenities } = this.state
      this.setState({
        amenities: amenities.concat(id)
      })
    }
  }
  deleteDummyAmenity = (id: String) => {
    const { amenityDummies } = this.state
    const filteredDummies = amenityDummies.filter(function(value){

      return value.id !== id;
    });
    this.setState({
      amenityDummies: filteredDummies,
    })
  }
  addDummyAmenity = () => {
    const { amenityDummies, addingAmenity: { name } } = this.state
    amenityDummies.push({
      name,
      id: 'deddd2b4-1c4f-4429-9957-a67b1122badd'
    })
    this.setState({
      amenityDummies,
    })
  }

  updateAddingDummy = (name: String) => {
    this.setState({
      addingAmenity: {
        name,
      }
    })
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}>
        {
          this.state.amenityDummies.map((amenty) => (
              <Row key={amenty.id} style={{margin: '20px 10px'}}>
                <Col lg={{ span: 15, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>{amenty.name}</span></Col>
                <Col lg={{ span: 3, offset: 1 }}>
                  <Switch defaultChecked={false} onChange={(checked) => this.addAmenity(checked, amenty.id)} />
                </Col>
                <Col lg={{ span: 3, offset: 1 }}><Icon onClick={() => this.deleteDummyAmenity(amenty.id)} type="close" style={{fontSize: 16, color: 'red', cursor: 'pointer'}}/></Col>
              </Row>
          ))
        }
        <Divider />
        <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Input
                onInput={(e: any) => this.updateAddingDummy(e.target.value)} />
            <Button type="primary" style={{marginLeft: '20px'}} onClick={this.addDummyAmenity}>Add Amenity</Button>
        </Grid>
        <Divider />
        <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button type="primary">Prev</Button>
          <Button type="primary">Next</Button>
        </Grid>
      </Form>
    )
  }
}

export default AddAmenitySection;