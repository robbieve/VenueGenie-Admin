import React, { Component, FormEvent } from 'react';
import Dropzone from 'react-dropzone'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Input, Select, Divider, Button, Alert, InputNumber, Row, Col, Switch, Icon, Upload, message } from 'antd';
import { VenueOptionItem, VenueOptions, MealPrice } from '../../../models/venue'
import { VenueInformationState } from '../interface'
import Grid from 'antd/lib/card/Grid';
import venue from '../../../services/venue'
import vibeify from '../../../services/vibeify'

const Dragger = Upload.Dragger;

interface InputDataSource {
  name: string,
  id: string,
}
interface AddingInput {
  name: string,
  type: string,
}
interface State {
  lookFeelDummies: InputDataSource[],
  lookFeels: String[],
  addingLookFeel: AddingInput,

  cuisineOptionDummies: InputDataSource[],
  cuisineOptions: String[],
  addingCusineOption: AddingInput,

  foodDrinkOptionDummies: InputDataSource[],
  foodDrinkOptions: String[],
  addingFoodDrinkOption: AddingInput,

  errors: string[];
}
type StateKeys = keyof State;
type VenueOptionKeys = keyof VenueOptions
type MealPriceKeys = keyof MealPrice
interface Props {
  data: VenueInformationState;
  updateState: Function;
  prev: Function;
}

class VenueDetailsSection extends Component<Props & RouteComponentProps> {
  state: State = {
    lookFeelDummies: [
      
    ],
    lookFeels: [

    ],
    addingLookFeel: {
      name: '',
      type: ''
    },
    cuisineOptionDummies: [
      
    ],
    cuisineOptions: [

    ],
    addingCusineOption: {
      name: '',
      type: ''
    },
    foodDrinkOptionDummies: [
      
    ],
    foodDrinkOptions: [

    ],
    addingFoodDrinkOption: {
      name: '',
      type: ''
    },
    errors: []
  }

  private handleSubmit = (e: FormEvent) => {
    const { data, history } = this.props
    e.preventDefault()
    
    this.validate()
      .then(() => {
        venue.create(data).then( resp => {
          if(resp) {
            history.push('/venue')
          }
        })
      })
      .catch(errors => {
          this.setState({ errors })
      })
  }

  private validate(): Promise<boolean> {
      let errors = [];
      const data = this.props.data
      if (data.seatedCapacity	 === 0 ) {
          errors.push('Seated capacity is required')
      }
      if (data.standingCapacity	 === 0 ) {
        errors.push('Standing capacity is required')
      }

      if (errors.length === 0) {
          return Promise.resolve(true)
      }
      return Promise.reject(errors)
  }
  componentWillMount() {
    venue.listOptions().then(resp => {
        const dataSource = resp.data
        this.setState({ 
          lookFeelDummies: dataSource.lookFeels,
          cuisineOptions: dataSource.cuisineOptions,
          foodDrinkOptionDummies: dataSource.foodDrinkOptions,
        })
    })
  }

  addItem = (checked: Boolean, id: String, key: StateKeys) => {
    const { updateState } = this.props
    if(key === 'lookFeels' || key === 'cuisineOptions' || key === 'foodDrinkOptions') {
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
    if (key === 'addingLookFeel' || key === 'addingCusineOption' || key === 'addingFoodDrinkOption') {
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

  updateStateLunch = ( key: MealPriceKeys, value: number) => {
    const { updateState, data: { lunchPrice } } = this.props
    lunchPrice[key] = value
    updateState('lunchPrice', lunchPrice)
  }

  updateStateDinner = ( key: MealPriceKeys, value: number) => {
    const { updateState, data: { dinnerPrice} } = this.props
    dinnerPrice[key] = value
    updateState('dinnerPrice', dinnerPrice)
  }

  render() {
    const { data, updateState } = this.props
    const { venueType } = data
    // File Upload
    const propsMulDish = {
      name: 'file',
      multiple: true,
      beforeUpload: (file: File) => {
        vibeify.upload(file).then(resp => {
          const { dishes } = this.props.data
          dishes.push({imgUrl: resp.data.url, name: ''})
          updateState('dishes', dishes)
        })
        return false;
      },
    };

    const propsMul = {
      name: 'file',
      multiple: true,
      beforeUpload: (file: File) => {
        vibeify.upload(file).then(resp => {
          const { images } = this.props.data
          images.push({url: resp.data.url})
          updateState('images', images)
        })
        return false;
      },
    };
    const props = {
      name: 'file',
      multiple: true,
      beforeUpload: (file: File) => {
        vibeify.upload(file).then(resp => {
          updateState('featuredImageUrl', resp.data.url)
        })
        return false;
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Upload Venue Pictures (Max. 5 megabytes per photo)">
          <Dragger {...propsMul}>
            <p className="ant-upload-text">Drag n Drop Files</p>
          </Dragger>
        </Form.Item>
        <Form.Item label="Featured Image">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="iGuide Link">
            <Input
                value={data.iGuideLink}
                onInput={(e: any) => updateState('iGuideLink', e.target.value)} />
        </Form.Item>
        <h3>What is the maximum venue capacity</h3>
        <Row style={{display: 'flex'}}>
          <Col lg={{ span: 12 }}>
            <Form.Item label="Seated Capacity">
                <InputNumber
                    value={data.seatedCapacity}
                    onChange={(value: any) => updateState('seatedCapacity', value)} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12 }}>
            <Form.Item label="Standing Capacity">
                <InputNumber
                    value={data.standingCapacity}
                    onChange={(value: any) => updateState('standingCapacity', value)} />
            </Form.Item>
          </Col>
        </Row>
        <h3>What is the minimum venue capacity</h3>
        <Form.Item label="Minimum Capacity">
            <InputNumber
                value={data.minCapacity}
                onChange={(value: any) => updateState('minCapacity', value)} />
        </Form.Item>
        {
          (venueType !== 'supperclub' && venueType !== 'restaurant') &&
          <Row>
            <h3>Rental fee for venue</h3>
            <Form.Item label="Rental Fees">
                <InputNumber
                    value={data.rentalFee}
                    onChange={(value: any) => updateState('rentalFee', value)} />
            </Form.Item>
          </Row>
        }
        {
          (venueType === 'supperclub' || venueType === 'restaurant' || venueType === 'hall') &&
          <Row>
            <Form.Item label="Lunch Prices">
              <Row style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Col lg={{ span: 12 }}>
                  <InputNumber
                    value={data.rentalFee}
                    onChange={(value: any) => this.updateStateLunch('buyout', value)} />
                </Col>
                <Col lg={{ span: 12 }}>
                  <InputNumber
                    value={data.rentalFee}
                    onChange={(value: any) => this.updateStateLunch( 'perPerson', value)} />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Dinner Prices">
                <Row style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <Col lg={{ span: 12 }}>
                    <InputNumber
                        value={data.rentalFee}
                        onChange={(value: any) => this.updateStateDinner('buyout', value)} />
                  </Col>
                  <Col lg={{ span: 12 }}>
                    <InputNumber
                      value={data.rentalFee}
                      onChange={(value: any) => this.updateStateDinner('perPerson', value)} />
                  </Col>
                </Row>
            </Form.Item>
          </Row>
        }
        {
          this.state.lookFeelDummies.map((item) => (
              <Row key={item.id} style={{margin: '20px 10px'}}>
                <Col lg={{ span: 15, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>{item.name}</span></Col>
                <Col lg={{ span: 3, offset: 1 }}>
                  <Switch defaultChecked={false} onChange={(checked) => this.addItem(checked, item.id, 'lookFeels')} />
                </Col>
                <Col lg={{ span: 3, offset: 1 }}><Icon onClick={() => this.deleteDummyItem(item.id, 'look_feel', 'lookFeels', 'lookFeelDummies')} type="close" style={{fontSize: 16, color: 'red', cursor: 'pointer'}}/></Col>
              </Row>
          ))
        }
        <Divider />
        <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Input
                onInput={(e: any) => this.updateAddingDummy(e.target.value, 'addingLookFeel')} />
            <Button type="primary" style={{marginLeft: '20px'}} onClick={() => this.addDummyItem('look_feel', 'lookFeels', 'lookFeelDummies')}>Add Look&Feel</Button>
        </Grid>
        <Divider />
        {
          (venueType === 'restaurant' || venueType === 'supperclub' || venueType === 'hall') &&
          <Row>
            {
              this.state.cuisineOptionDummies.map((item) => (
                  <Row key={item.id} style={{margin: '20px 10px'}}>
                    <Col lg={{ span: 15, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>{item.name}</span></Col>
                    <Col lg={{ span: 3, offset: 1 }}>
                      <Switch defaultChecked={false} onChange={(checked) => this.addItem(checked, item.id, 'cuisineOptions')} />
                    </Col>
                    <Col lg={{ span: 3, offset: 1 }}><Icon onClick={() => this.deleteDummyItem(item.id, 'cuisine_option', 'cuisineOptions', 'cuisineOptionDummies')} type="close" style={{fontSize: 16, color: 'red', cursor: 'pointer'}}/></Col>
                  </Row>
              ))
            }
            <Divider />
            <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Input
                onInput={(e: any) => this.updateAddingDummy(e.target.value, 'addingLookFeel')} />
            <Button type="primary" style={{marginLeft: '20px'}} onClick={() => this.addDummyItem('cuisine_option', 'cuisineOptions', 'cuisineOptionDummies')}>Add Cuisine</Button>
        </Grid>
        <Divider />
          </Row>
        }
        {
          (venueType !== 'event_space' && venueType !== 'loft') &&
          <Row>
            {
              this.state.foodDrinkOptionDummies.map((item) => (
                  <Row key={item.id} style={{margin: '20px 10px'}}>
                    <Col lg={{ span: 15, offset: 1 }}><span style={{fontSize: 16, fontWeight: 700}}>{item.name}</span></Col>
                    <Col lg={{ span: 3, offset: 1 }}>
                      <Switch defaultChecked={false} onChange={(checked) => this.addItem(checked, item.id, 'foodDrinkOptions')} />
                    </Col>
                    <Col lg={{ span: 3, offset: 1 }}><Icon onClick={() => this.deleteDummyItem(item.id, 'food_drink_option', 'foodDrinkOptions', 'foodDrinkOptionDummies')} type="close" style={{fontSize: 16, color: 'red', cursor: 'pointer'}}/></Col>
                  </Row>
              ))
            }
            <Divider />
            <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <Input
                    onInput={(e: any) => this.updateAddingDummy(e.target.value, 'addingLookFeel')} />
                <Button type="primary" style={{marginLeft: '20px'}} onClick={() => this.addDummyItem('food_drink_option', 'foodDrinkOptions', 'foodDrinkOptionDummies')}>Add Food Drink</Button>
            </Grid>
            <Divider />
            <Form.Item label="Dish Photos">
              <Dragger {...propsMulDish}>
                <p className="ant-upload-text">Drag n Drop Files</p>
              </Dragger>
            </Form.Item>
          </Row>
        }
        {this.state.errors.map(err => (
            <Alert style={{marginBottom: 16}} key={err} message={err} type="error" />
        ))}
        <Grid style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button type="primary" htmlType="submit">Next</Button>
        </Grid>
      </Form>
    )
  }
}

export default withRouter(VenueDetailsSection)