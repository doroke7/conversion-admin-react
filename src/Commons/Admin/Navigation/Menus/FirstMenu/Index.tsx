import React, { useContext, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Helpers from '@/Helpers';

import style from './style';

function FirstMenu(oProps: any) {
  let classes = style(void 0);
  const oAnchorRef: any = React.useRef<HTMLButtonElement>(null);
  let oLocation = useLocation();
  let sPathname = oLocation.pathname;
  let sMenuName = sPathname;

  let oMenu = oProps.menu;
  useEffect(() => {
    // componentDidMount is here!
  }, []);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchors: {}
  });
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

  function handleMouseEnter(oMenu: any) {
    return (oEvent: any) => {
      enableMouseEnter(oEvent, oMenu);
    };
  }

  function enableMouseEnter(oEvent: any, oMenu: any) {
    let oAnchors = {
      [oMenu.id]: Object.prototype.hasOwnProperty.call(oState.anchors, oMenu.id) ? !oState.anchors[oMenu.id] : true
    };
    setState({ ...oState, anchors: oAnchors });
  }

  function handleMouseOut(oMenu: any) {
    return () => {
      enableMouseOut(oMenu);
    };
  }

  function enableMouseOut(oMenu: any) {
    setState({ ...oState, anchor: null });
  }

  function handleShiftAway(oMenu: any) {
    return () => {
      enableShiftAway(oMenu);
    };
  }

  function enableShiftAway(oMenu: any) {
    setState({ ...oState, anchor: null, anchors: {} });
  }

  function handleKeyDown() {
    setState({ ...oState, anchor: null, anchors: {} });
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

  return Object.prototype.hasOwnProperty.call(oMenu, 'menus') ? (
    <>
      <ListItem
        button
        onClick={handleExpand(oMenu)}
        className={clsx({
          [classes.listItemFirst]: true,
          [classes.listItemEnable]: sMenuName === oMenu.path
        })}
      >
        <ListItemIcon className={clsx(classes.listItemIconFirst)}>{<oMenu.Icon />}</ListItemIcon>
        <ListItemText className={clsx(classes.listText)} primary={oMenu.text} />
        {Object.prototype.hasOwnProperty.call(oState.menus, oMenu.id) && oState.menus[oMenu.id] ? (
          <ExpandLessIcon className={classes.expandLess} />
        ) : (
          <ExpandMoreIcon className={classes.expandMore} />
        )}
      </ListItem>

      <Collapse
        in={Object.prototype.hasOwnProperty.call(oState.menus, oMenu.id) && oState.menus[oMenu.id]}
        timeout="auto"
        unmountOnExit
      >
        <List component="div">
          {oMenu.menus.map((oMenu: any, iIndex: any) => (
            <ListItem
              button
              onMouseEnter={handleMouseEnter(oMenu)}
              onMouseOut={handleMouseOut(oMenu)}
              ref={oAnchorRef}
              aria-controls={'menu-' + oMenu.id}
              aria-haspopup="true"
              className={clsx({
                [classes.listItemSecond]: true
              })}
              key={oMenu.id}
            >
              <ListItemIcon className={clsx(classes.listItemIconSecond)}>{<oMenu.Icon />}</ListItemIcon>
              <ListItemText className={clsx(classes.listText)} primary={oMenu.text} />
              {Object.prototype.hasOwnProperty.call(oMenu, 'menus') ? (
                <ArrowRightIcon className={classes.arrowRightIcon} />
              ) : (
                <></>
              )}
              {Object.prototype.hasOwnProperty.call(oMenu, 'menus') ? (
                <Popper
                  open={Object.prototype.hasOwnProperty.call(oState.anchors, oMenu.id) && oState.anchors[oMenu.id]}
                  anchorEl={oAnchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    // Grow： Material-UI 动画组件
                    <Grow {...TransitionProps}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleShiftAway(oMenu)}>
                          <MenuList
                            autoFocusItem={
                              Object.prototype.hasOwnProperty.call(oState.anchors, oMenu.id) && oState.anchors[oMenu.id]
                            }
                            id={'menu-' + oMenu.id}
                            onKeyDown={handleKeyDown}
                          >
                            {oMenu.menus.map((oMenu: any, iIndex: any) => (
                              <MenuItem key={oMenu.id} onClick={handleShiftAway(oMenu)}>
                                {oMenu.text}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              ) : (
                <></>
              )}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  ) : (
    <Link to={oMenu.path} className={clsx(classes.link, {})} onClick={handleClick(oMenu)}>
      <ListItem
        button
        key={oMenu.text}
        className={clsx({
          [classes.listItemFirst]: true,
          [classes.listItemEnable]: sMenuName === oMenu.path
        })}
      >
        <ListItemIcon className={clsx(classes.listItemIconFirst)}>{<oMenu.Icon />}</ListItemIcon>
        <ListItemText className={clsx(classes.listText)} primary={oMenu.text} />
      </ListItem>
    </Link>
  );
}

export default FirstMenu;
