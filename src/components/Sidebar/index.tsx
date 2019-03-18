import React, { Component } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";

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
                    <Menu.Item key="0">
                        <Icon type="dashboard" />
                        <span>Reservations</span>
                    </Menu.Item>
                    <SubMenu
                        key="1"
                        title={<span><Icon type="user" /><span>Venues</span></span>}
                    >
                        <Menu.Item key="31">Create</Menu.Item>
                        <Menu.Item key="41">All</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="2"
                        title={<span><Icon type="user" /><span>Event Services</span></span>}
                    >
                        <Menu.Item key="3">Create</Menu.Item>
                        <Menu.Item key="43">All</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="3"
                        title={<span><Icon type="user" /><span>Event Service Types</span></span>}
                    >
                        <Menu.Item key="3">Create</Menu.Item>
                        <Menu.Item key="34">All</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="5"
                        title={<span><Icon type="user" /><span>Photo Gallery</span></span>}
                    >
                        <Menu.Item key="3">
                            <Link to="/photo-gallery/new">
                                Create
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="34">All</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar;