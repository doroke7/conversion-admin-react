import React, { useContext, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import ThirdMenu from './ThirdMenu/Index';

import Helpers from '@/Helpers';

import style from './style';

function SecondMenu(oProps: any) {
  let classes = style(void 0);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchor: null
  });

  let oMenu = oProps.menu;

  function handleMouseEnter(oEvent: any) {
    setState({ ...oState, anchor: oEvent.currentTarget });
  }

  function handleMouseOut(oEvent: any) {
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

  return (
    <ListItem
      button
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      ref={oState.anchor}
      aria-controls={'menu-' + oMenu.id}
      aria-haspopup="true"
      className={clsx({
        [classes.listItem]: true
      })}
      key={oMenu.id}
    >
      <ListItemIcon className={clsx(classes.listItemIcon)}>{<oMenu.Icon />}</ListItemIcon>
      <ListItemText className={clsx(classes.listText)} primary={oMenu.text} />
      {Object.prototype.hasOwnProperty.call(oMenu, 'menus') ? (
        <ArrowRightIcon className={classes.arrowRightIcon} />
      ) : (
        <></>
      )}
      {Object.prototype.hasOwnProperty.call(oMenu, 'menus') ? (
        <Popper open={Boolean(oState.current)} anchorEl={oState.current} role={undefined} transition disablePortal>
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
                      <ThirdMenu key={oMenu.id} text={oMenu.text} onClick={handleShiftAway(oMenu)}></ThirdMenu>
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
  );
}

export default SecondMenu;
