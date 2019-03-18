import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import Dashboard from './containers/Dashboard'
import Venue from './containers/Venue'

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
          
            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/venue" component={Venue} />
              </Switch>
            </Content>

            {/* <Footer style={{ textAlign: 'center' }}>
              Threeaccents ©2019 Created by Threeaccents
            </Footer> */}

          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
