import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Bar from './Bar/Index';
import LargeMenus from './LargeMenus/Index';
import SmallMenus from './SmallMenus/Index';
import Tabs from './Tabs/Index';

import context from '@/contexts';
import utilities from '@/utilities';

import Helpers from '@/Helpers';
import CONFIGS from '@/CONFIGS/';

import style from './style';

let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

function Navigation(oProps: any) {
  let aTabsRows = [
    {
      text: '会员列表',
      icon: 'AssignmentIndOutlinedIcon',
      content: 'AppUser'
    }
    // {
    //   text: '订单列表',
    //   icon: 'PlaylistAddCheckOutlinedIcon',
    //   content: 'OrderInnfo'
    // },
    // {
    //   text: '平台配置',
    //   icon: 'BorderAllOutlinedIcon',
    //   content: 'Config'
    // },
    // {
    //   text: '剧集列表',
    //   icon: 'VideocamOutlinedIcon',
    //   content: 'Vod'
    // }
  ];

  let oTabs = {
    1: {
      text: '会员列表',
      icon: 'AssignmentIndOutlinedIcon',
      content: 'AppUser'
    }
  };

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname;
  let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

  let oClasses = style(void 0);

  const [oState, setState] = React.useState<any>({
    open: true,
    tabs: Helpers.Tab.get() // 更換 route 的時候 , React Componet 重新 render, state init
  });

  function handleDrawerOpen() {
    setState({ ...oState, open: true });
  }

  function handleDrawerClose() {
    setState({ ...oState, open: false });
  }

  function removeTab(iIndex: number) {
    return (oEvent: any) => {
      oEvent.stopPropagation(); // 取消冒泡 取消 <Link></Link>
      oEvent.preventDefault(); // 取消 a tag 取消 href
    };
  }

  return (
    <div className={oClasses.root}>
      <Bar handleDrawerOpen={handleDrawerOpen} open={oState.open}></Bar>
      <Drawer
        variant="permanent"
        className={clsx(oClasses.drawer, {
          [oClasses.drawerOpen]: oState.open,
          [oClasses.drawerClose]: !oState.open
        })}
        classes={{
          paper: clsx(oClasses.drawerPaper, {
            [oClasses.drawerOpen]: oState.open,
            [oClasses.drawerClose]: !oState.open
          })
        }}
        open={oState.open}>
        <div className={oClasses.toolbar}>
          <span className={oClasses.appName}>{CONFIGS.APP.NAME}</span>
          <IconButton className={oClasses.iconButton} onClick={handleDrawerClose}>
            <DoubleArrowIcon></DoubleArrowIcon>
            {/* 点击右边的 App-Icon */}
          </IconButton>
        </div>
        <Divider />
        <LargeMenus status={oState.open} menus={CONFIGS.MENUS} />
        <SmallMenus status={!oState.open} menus={CONFIGS.MENUS} />
        <Divider />
        <List></List>
      </Drawer>
      <main className={oClasses.content}>
        <div className={oClasses.toolbar}></div>
        <Tabs tabs={aTabsRows}></Tabs>
      </main>
    </div>
  );
}

export default withRouter(Navigation);
