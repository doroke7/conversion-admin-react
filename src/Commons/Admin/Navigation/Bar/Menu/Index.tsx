import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import style from './style';

function Menu(oProps: any) {
  let classes = style(void 0);

  let [open, setOpen] = useState(false);
  let anchorRef = useRef<HTMLButtonElement>(null);

  let handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  let handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  let prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleClose}>登出</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
  );
}

export default Menu;
