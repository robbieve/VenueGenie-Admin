import React, { Component, FormEvent } from 'react';
import { Form, Input, Select, Divider, Button, Alert, InputNumber, Row, Col, Switch, Icon } from 'antd';
import { VenueOptionItem, VenueOptions } from '../../../models/venue'
import { VenueInformationState } from '../interface'
import Grid from 'antd/lib/card/Grid';
import venue from '../../../services/venue'

interface AmenityDataSource {
  name: string,
  id: string,
}
interface AddingAmenityInput {
  name: string,
  type: string,
}
interface State {
  amenityDummies: AmenityDataSource[],
  amenities: String[],
  addingAmenity: AddingAmenityInput,
}
type StateKeys = keyof State;
type VenueOptionKeys = keyof VenueOptions
interface Props {
  updateState: Function;
  next: Function;
  prev: Function;
}

class AddAmenitySection extends Component<Props> {

  state: State = {
    amenityDummies: [
      
    ],
    amenities: [

    ],
    addingAmenity: {
      name: '',
      type: 'amenity'
    }
  }
  componentWillMount() {
    venue.listOptions().then(resp => {
        const dataSource = resp.data.amenities
        this.setState({ amenityDummies: dataSource })
    })
  }
  private handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    this.props.next()
  }
  addItem = (checked: Boolean, id: String, key: StateKeys) => {
    const { updateState } = this.props
    if(key === 'amenities') {
      if (checked === true) {
        const item = this.state[key]
        this.setState({
          [key]: item.concat(id)
        }, () => {
          updateState(key, this.state[key])
        })
      }
    }
  }

  deleteDummyItem = (id: string, url: string, dataKey: VenueOptionKeys, key: StateKeys) => {
    venue.removeOption(url, id ).then(resp => {
      const dataSource = resp.data[dataKey]
      this.setState({ [key]: dataSource })
    })
  }
  addDummyItem = (url: string, dataKey: VenueOptionKeys, key: StateKeys) => {
    if (key === 'addingAmenity') {
      const { [key]: {name} } = this.state
      venue.addOption(url, name ).then(resp => {
        const dataSource = resp.data[dataKey]
        this.setState({ [key]: dataSource })
      })
    }
  }

  updateAddingDummy = (name: String, key: StateKeys) => {
    this.setState({
      [key]: {
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
                  <Switch defaultChecked={false} onChange={(checked) => this.addItem(checked, amenty.id, 'amenities')} />
                </Col>
                <Col lg={{ span: 3, offset: 1 }}><Icon onClick={() => this.deleteDummyItem(amenty.id, 'amenity', 'amenities', 'amenityDummies')} type="close" style={{fontSize: 16, color: 'red', cursor: 'pointer'}}/></Col>
              </Row>
          ))
        }
        <Divider />
        <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Input
                onInput={(e: any) => this.updateAddingDummy(e.target.value, 'addingAmenity')} />
            <Button type="primary" style={{marginLeft: '20px'}} onClick={() => this.addDummyItem('amenity', 'amenities', 'amenityDummies')}>Add Amenity</Button>
        </Grid>
        <Divider />
        <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button type="primary" onClick={() => this.props.prev()}>Prev</Button>
          <Button type="primary" onClick={() => this.props.next()}>Next</Button>
        </Grid>
      </Form>
    )
  }
}

export default AddAmenitySection;