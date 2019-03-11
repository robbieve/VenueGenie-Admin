import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DashboardView from './components/views/DashboardView/DashboardView'
import CreateVenueView from './components/views/CreateVenueView/CreateVenueView'
import Sidebar from './components/containers/Sidebar/Sidebar'

import {
  Layout
} from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sidebar />
          <Layout style={{ marginLeft: 200 }}>
          
            <Header style={{ background: '#fff', padding: 0 }} />

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Switch>
                <Route exact path="/dashboard" component={DashboardView} />
                <Route exact path="/venue/new" component={CreateVenueView} />
              </Switch>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              Threeaccents ©2019 Created by Threeaccents
            </Footer>

          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
