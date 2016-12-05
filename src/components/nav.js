import React from 'react';
import { Menu } from 'antd';

function Nav(props) {
  return(
    <Menu mode="horizontal" onClick={props.menuChange} selectedKeys={[props.menu]}>
      <Menu.Item key="now_playing">
        Playing
      </Menu.Item>
      <Menu.Item key="favs">
        Want to See
      </Menu.Item>
    </Menu>
  );
}

export default Nav;
