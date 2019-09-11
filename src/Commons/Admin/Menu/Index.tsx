import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountBox from '@material-ui/icons/AccountBox';

import Tabs from './Tabs';

import {
  tab
} from '@/contexts';

import {
  TabHelper
} from '@/Helpers';

import {
  MENUS
} from '@/CONFIGS';

import style from './style';

function Menu(oProps: any) {
  let classes = style(void 0);
  let theme = useTheme();
  // let [open, setOpen] = React.useState(true);
  // let [tabs, setTabs] = React.useState([]);

  const [oState, setState] = React.useState<any>({
    open: true,
    tabs: TabHelper.get(),    // 更換 route 的時候 , React Componet 重新 render, state init
  });

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname.replace(/^\/admin\//gi, '').replace(/\/\w*/gi, '');

  useEffect(() => {
    // componentDidMount is here!
    if(sMenuName) {
      let oTab = MENUS[sMenuName];
      enableTab(oTab);
    }

    return () => {
        // componentWillUnmount is here!
    }
  },[]);

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

  function enableTab(oMenu: any){
    let aTabs: any[] = TabHelper.get();
    let iIndex;
    let iLength = aTabs.length;
    let bExistent = false;
    let sMenuName = oMenu.path.replace(/\//gi, '');
    
    for(iIndex = 0; iIndex < iLength; iIndex++) {
      let _sMenuName: any = aTabs[iIndex];
      if(sMenuName === _sMenuName) {
        bExistent = true;
        break;
      }
    }
    if(!bExistent) {
      aTabs.push(sMenuName);
    }
    setState({ ...oState, tabs: aTabs });
    TabHelper.set(aTabs);
  }

  function removeTab(iIndex: number) {
    return (oEvent: any) => {
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
        oProps.history.push('/admin/' + __sMenuName);
        return;
      }
  
      if (sMenuName === _sMenuName && 2 <= aTabs.length && iIndex + 1 === aTabs.length) {
        let __sMenuName = aTabs[iIndex - 1];
        oProps.history.push('/admin/' + __sMenuName);
        return;
      }
  
      if (sMenuName !== _sMenuName) {
        // do nothing
        return;
      }
    }

  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: oState.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: oState.open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            管理系統
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: oState.open,
          [classes.drawerClose]: !oState.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: oState.open,
            [classes.drawerClose]: !oState.open,
          }),
        }}
        open={oState.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.values(MENUS).map((oMenu: any, iIndex) => (
            <Link to={"/admin" + oMenu.path} className={clsx(classes.link, {
            })} onClick={handleClick(oMenu)}>
              <ListItem button key={oMenu.text} className={clsx({
                [classes.listItemEnable]: sMenuName === oMenu.path.replace(/^\//gi, ''),
              })}>
                <ListItemIcon>{ <oMenu.Icon /> }</ListItemIcon>
                <ListItemText primary={oMenu.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}>
        </div>
        <tab.Provider value={oState.tabs}>
          <Tabs removeTab={removeTab}/>
        </tab.Provider>
        <div className={classes.subContent}>
          <Box className={classes.title} fontWeight="fontWeightBold" fontSize={20}>
            {sMenuName && MENUS[sMenuName].text ? MENUS[sMenuName].text : sMenuName}
          </Box>
          <Box className={classes.description} fontWeight="fontWeightLight" fontSize={12}>
            {sMenuName && MENUS[sMenuName].description ? MENUS[sMenuName].description : ''}
          </Box>
          <Paper className={classes.paper}>
            {oProps.children}
          </Paper>
        </div>
      </main>
    </div>
  );
}

export default withRouter(Menu);