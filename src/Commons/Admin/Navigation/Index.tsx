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
import Tabs from './Tabs/Index';
import Bar from './Bar/Index';
import PrimaryMenus from './PrimaryMenus/Index';
import SecondaryMenus from './SecondaryMenus/Index';

import context from '@/contexts';
import utilities from '@/utilities';

import Helpers from '@/Helpers';
import CONFIGS from '@/CONFIGS/';

import style from './style';

let tab = context.tab;

let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

function Navigation(oProps: any) {
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

      let aTabs: any[] = Helpers.Tab.get();
      let _aTabs: any[] = Helpers.Tab.get();

      let _sMenuName = aTabs[iIndex];
      _aTabs.splice(iIndex, 1);
      setState({ ...oState, tabs: _aTabs });
      Helpers.Tab.set(_aTabs);

      // 如果移除的 tab 为最后一个，就返回 /admin
      if (sMenuName === _sMenuName && 1 === aTabs.length) {
        oProps.history.push('/admin');
        return;
      }
      // 如果移除的 tab 不为最后一个，而且 不是 UI 最右边那个 tab, 就 返回最右边那个 地址
      if (sMenuName === _sMenuName && 2 <= aTabs.length && iIndex + 1 < aTabs.length) {
        let __sMenuName = aTabs[iIndex + 1];
        oProps.history.push(__sMenuName);
        return;
      }

      // 如果移除的 tab 不为最后一个，而且 是 UI 最右边那个 tab, 就 返回最右边-的左边 那个 地址
      if (sMenuName === _sMenuName && 2 <= aTabs.length && iIndex + 1 === aTabs.length) {
        let __sMenuName = aTabs[iIndex - 1];
        oProps.history.push(__sMenuName);
        return;
      }

      if (sMenuName !== _sMenuName) {
        // do nothing
        return;
      }
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
        <PrimaryMenus status={oState.open} />
        <SecondaryMenus status={!oState.open} />
        <Divider />
        <List></List>
      </Drawer>
      <main className={oClasses.content}>
        <div className={oClasses.toolbar}></div>
        <tab.Provider value={oState.tabs}>
          <Tabs removeTab={removeTab} />
        </tab.Provider>
        {oState.tabs.length >= 1 ? (
          <Paper className={oClasses.paper}>
            <Box className={oClasses.title} fontWeight="fontWeightBold" fontSize={20}>
              {sMenuName && oMenus[sMenuName] && oMenus[sMenuName].text ? oMenus[sMenuName].text : sMenuName}
            </Box>
            <Box className={oClasses.description} fontWeight="fontWeightLight" fontSize={12}>
              {sMenuName && oMenus[sMenuName] && oMenus[sMenuName].description ? oMenus[sMenuName].description : ''}
            </Box>
          </Paper>
        ) : (
          ''
        )}

        <div className={oClasses.subContent}>{oProps.children}</div>
      </main>
    </div>
  );
}

export default withRouter(Navigation);
