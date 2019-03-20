import React, { Component, FormEvent } from 'react';
import Dropzone from 'react-dropzone'
import { Form, Input, Select, Divider, Button, Alert, InputNumber, Row, Col, Switch, Icon, Upload, message } from 'antd';
import { VenueOptionItem, VenueOptions } from '../../../models/venue'
import { VenueInformationState } from '../interface'
import Grid from 'antd/lib/card/Grid';
import venue from '../../../services/venue'
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
}
type StateKeys = keyof State;
type VenueOptionKeys = keyof VenueOptions
interface Props {
  data: VenueInformationState;
  updateState: Function;
  next: Function;
}

const propsMul = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info: any) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info: any) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class VenueDetailsSection extends Component<Props> {
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
   
    if(key === 'lookFeels' || key === 'cuisineOptions' || key === 'foodDrinkOptions') {
      if (checked === true) {
        const item = this.state[key]
        this.setState({
          [key]: item.concat(id)
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

  render() {
    const { data, updateState } = this.props
    return (
      <Form>
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
        <h3>Rental fee for venue</h3>
        <Form.Item label="Rental Fees">
            <InputNumber
                value={data.rentalFee}
                onChange={(value: any) => updateState('rentalFee', value)} />
        </Form.Item>
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
      </Form>
    )
  }
}

export default VenueDetailsSection