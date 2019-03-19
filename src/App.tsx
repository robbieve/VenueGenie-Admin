import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import Dashboard from './containers/Dashboard'
import Venue from './containers/Venue'
import CreateVenue from './containers/CreateVenue'
import CreateEventGallery from './containers/CreateEventGallery';
import EventGalleries from './containers/EventGalleries';
import EventGalleryDetails from './containers/EventGalleryDetails';

import {
  Layout
} from 'antd';

const { Content, Header, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sidebar />
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', minHeight: 'calc(100vh - 60px)' }}>
              <Switch>
                <Route exact path="/event-gallery/new" component={CreateEventGallery} />
                <Route exact path="/event-galleries" component={EventGalleries} />
                <Route exact path="/event-gallery/:id" component={EventGalleryDetails} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/venue" component={Venue} />
                <Route exact path="/venue/new" component={CreateVenue} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Venue Genie ©2019 Created by Threeaccents
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
