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
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Tabs from './Tabs/Index';
import Bar from './Bar/Index';
import utilities from '@/utilities';

import context from '@/contexts';

import Helpers from '@/Helpers';
import CONFIGS from '@/CONFIGS/';

import style from './style';

let tab = context.tab;

console.log(CONFIGS.MENUS);

function Navigation(oProps: any) {
  let classes = style(void 0);
  // let [open, setOpen] = React.useState(true);
  // let [tabs, setTabs] = React.useState([]);

  const [oState, setState] = React.useState<any>({
    open: true,
    tabs: Helpers.Tab.get(), // 更換 route 的時候 , React Componet 重新 render, state init
    menus: {}
  });

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname;
  let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

  useEffect(() => {
    // componentDidMount is here!
    let oRegular = /admin\/(\w+)/i;

    if (sMenuName.match(oRegular)) {
      let oTab = oMenus[sMenuName];
      enableClick(oTab);
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

  function handleExpand(oMenu: any) {
    return () => {
      enableExpand(oMenu);
    };
  }

  function enableExpand(oMenu: any) {
    let oMenus = {
      [oMenu.id]: Object.prototype.hasOwnProperty.call(oState.menus, oMenu.id) ? !oState.menus[oMenu.id] : true
    };
    setState({ ...oState, menus: oMenus });
  }

  function handleClick(oMenu: any) {
    return () => {
      enableClick(oMenu);
    };
  }

  function enableClick(oMenu: any) {
    let aTabs: any[] = Helpers.Tab.get();
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
    Helpers.Tab.set(aTabs);
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
          {CONFIGS.MENUS.map((oMenu: any, iIndex: any) =>
            Object.prototype.hasOwnProperty.call(oMenu, 'menus') ? (
              <>
                <ListItem
                  button
                  onClick={handleExpand(oMenu)}
                  key={oMenu.text}
                  className={clsx({
                    [classes.listItem]: true,
                    [classes.listItemEnable]: sMenuName === oMenu.path
                  })}
                >
                  <ListItemIcon className={clsx(classes.listItemIcon)}>{<oMenu.Icon />}</ListItemIcon>
                  <ListItemText className={clsx(classes.listText)} primary={oMenu.text} />
                  {Object.prototype.hasOwnProperty.call(oState.menus, oMenu.id) && oState.menus[oMenu.id] ? (
                    <ExpandLess className={classes.expandLess} />
                  ) : (
                    <ExpandMore className={classes.expandMore} />
                  )}
                </ListItem>
                <Collapse
                  in={Object.prototype.hasOwnProperty.call(oState.menus, oMenu.id) && oState.menus[oMenu.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem button className={classes.listText}>
                      <ListItemIcon className={clsx(classes.listItemIcon)}>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TEST" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            ) : (
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
            )
          )}
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
              {sMenuName && oMenus[sMenuName] && oMenus[sMenuName].text ? oMenus[sMenuName].text : sMenuName}
            </Box>
            <Box className={classes.description} fontWeight="fontWeightLight" fontSize={12}>
              {sMenuName && oMenus[sMenuName] && oMenus[sMenuName].description ? oMenus[sMenuName].description : ''}
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
