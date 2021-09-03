import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import Tabs from './Tabs/Index';
import Bar from './Bar/Index';

import context from '@/contexts';

import Helpers from '@/Helpers';
import CONFIGS from '@/CONFIGS/';

import style from './style';

let tab = context.tab;

function Navigation(oProps: any) {
  let classes = style(void 0);
  // let [open, setOpen] = React.useState(true);
  // let [tabs, setTabs] = React.useState([]);

  const [oState, setState] = React.useState<any>({
    open: true,
    tabs: Helpers.Tab.get() // 更換 route 的時候 , React Componet 重新 render, state init
  });

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname;

  useEffect(() => {
    // componentDidMount is here!
    let oRegular = /admin\/(\w+)/i;

    if (sMenuName.match(oRegular)) {
      let oTab = CONFIGS.MENUS[sMenuName];
      enableTab(oTab);
    }

    return () => {
      // componentWillUnmount is here!
    };
  }, []);

  function handleDrawerOpen() {
    setState({ ...oState, open: true });
  }

  function handleDrawerClose() {
    setState({ ...oState, open: false });
  }

  function handleClick(oMenu: any) {
    return () => {
      enableTab(oMenu);
    };
  }

  function enableTab(oMenu: any) {
    let aTabs: any[] = TabHelper.get();
    let iIndex;
    let iLength = aTabs.length;
    let bExistent = false;
    let sMenuName = oMenu.path;

    for (iIndex = 0; iIndex < iLength; iIndex++) {
      let _sMenuName: any = aTabs[iIndex];
      if (sMenuName === _sMenuName) {
        bExistent = true;
        break;
      }
    }
    if (!bExistent) {
      aTabs.push(sMenuName);
    }
    setState({ ...oState, tabs: aTabs });
    TabHelper.set(aTabs);
  }

  function removeTab(iIndex: number) {
    return (oEvent: any) => {
      oEvent.stopPropagation(); // 取消冒泡 取消 <Link></Link>
      oEvent.preventDefault(); // 取消 a tag 取消 href

      let aTabs: any[] = TabHelper.get();
      let _aTabs: any[] = TabHelper.get();

      let _sMenuName = aTabs[iIndex];
      _aTabs.splice(iIndex, 1);
      setState({ ...oState, tabs: _aTabs });
      TabHelper.set(_aTabs);
      if (sMenuName === _sMenuName && 1 === aTabs.length) {
        oProps.history.push('/admin');
        return;
      }
      if (sMenuName === _sMenuName && 2 <= aTabs.length && iIndex + 1 < aTabs.length) {
        let __sMenuName = aTabs[iIndex + 1];
        oProps.history.push(__sMenuName);
        return;
      }

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
    <div className={classes.root}>
      <Bar handleDrawerOpen={handleDrawerOpen} open={oState.open}></Bar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: oState.open,
          [classes.drawerClose]: !oState.open
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: oState.open,
            [classes.drawerClose]: !oState.open
          })
        }}
        open={oState.open}
      >
        <div className={classes.toolbar}>
          <IconButton className={classes.iconButton} onClick={handleDrawerClose}>
            ⮞
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.values(CONFIGS.MENUS).map((oMenu: any, iIndex) => (
            <Link to={oMenu.path} className={clsx(classes.link, {})} onClick={handleClick(oMenu)} key={iIndex}>
              <ListItem
                button
                key={oMenu.text}
                className={clsx({
                  [classes.listItem]: true,
                  [classes.listItemEnable]: sMenuName === oMenu.path
                })}
              >
                <ListItemIcon className={clsx(classes.listItemIcon)}>{<oMenu.Icon />}</ListItemIcon>
                <ListItemText className={clsx(classes.listText)} primary={oMenu.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <tab.Provider value={oState.tabs}>
          <Tabs removeTab={removeTab} />
        </tab.Provider>
        {oState.tabs.length >= 1 ? (
          <Paper className={classes.paper}>
            <Box className={classes.title} fontWeight="fontWeightBold" fontSize={20}>
              {sMenuName && CONFIGS.MENUS[sMenuName] && CONFIGS.MENUS[sMenuName].text
                ? CONFIGS.MENUS[sMenuName].text
                : sMenuName}
            </Box>
            <Box className={classes.description} fontWeight="fontWeightLight" fontSize={12}>
              {sMenuName && CONFIGS.MENUS[sMenuName] && CONFIGS.MENUS[sMenuName].description
                ? CONFIGS.MENUS[sMenuName].description
                : ''}
            </Box>
          </Paper>
        ) : (
          ''
        )}

        <div className={classes.subContent}>{oProps.children}</div>
      </main>
    </div>
  );
}

export default withRouter(Navigation);
