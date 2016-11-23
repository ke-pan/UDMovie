import React from 'react';
import { Menu } from 'antd';

// const Nav = React.createClass({
//   render() {
//     return (
//       <Menu mode="horizontal">
//         <Menu.Item>
//           Upcoming
//         </Menu.Item>
//         <Menu.Item>
//           Want to See
//         </Menu.Item>
//       </Menu>
//     );
//   }
// });
function Nav(props) {
  return(
    <Menu mode="horizontal" onClick={props.menuChange} selectedKeys={[props.menu]}>
      <Menu.Item key="upcoming">
        Upcoming
      </Menu.Item>
      <Menu.Item key="favs">
        Want to See
      </Menu.Item>
    </Menu>
  );
}

export default Nav;
