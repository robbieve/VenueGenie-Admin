import React, { Component } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

class Sidebar extends Component {
    render() {
        return (
            <Sider style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
            }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="0">
                        <Icon type="dashboard" />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <SubMenu
                        key="1"
                        title={<span><Icon type="user" /><span>Venues</span></span>}
                    >
                        <Menu.Item key="31">Tom</Menu.Item>
                        <Menu.Item key="41">Bill</Menu.Item>
                        <Menu.Item key="51">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="2"
                        title={<span><Icon type="user" /><span>Event Services</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="43">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="3"
                        title={<span><Icon type="user" /><span>Event Service Types</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="34">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="4"
                        title={<span><Icon type="user" /><span>Reservations</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="34">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="5"
                        title={<span><Icon type="user" /><span>Users</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="34">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar;