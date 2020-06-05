import React, { useState } from 'react';

import AppBarReact from './AppBar';
import DrawerReact from './Drawer';
import { withRouter, useHistory } from 'react-router-dom';

const SidebarAppbarWrapper = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const clickDrawerItem = (id) => {
    history.push(`/${id}`);
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <AppBarReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <DrawerReact
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        selectDrawerItem={clickDrawerItem}
      />
      <div style={{ marginTop: '35px' }}>{children}</div>
    </div>
  );
};

export default withRouter(SidebarAppbarWrapper);
