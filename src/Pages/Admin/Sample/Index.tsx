import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import fStyles from './style';

export default function MenuListComposition() {
  const oClasses = fStyles();

  let [oState, cSetState] = React.useState<any>({
    open: false,
    menus: {}
  });

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    cSetState({ ...oState, open: !oState.open });
  };

  const handleClose = (oEvent: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(oEvent.target as HTMLElement)) {
      return;
    }

    cSetState({ ...oState, open: false });
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      cSetState({ ...oState, open: false });
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const oPrevOpen = React.useRef(oState.open);
  React.useEffect(() => {
    if (oPrevOpen.current === true && oState.open === false) {
      anchorRef.current!.focus();
    }

    oPrevOpen.current = open;
  }, [oState.open]);

  return (
    <div className={oClasses.root}>
      <div>
        <Button ref={anchorRef} aria-controls={oState.open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
          打开菜单
        </Button>
        <Popper open={oState.open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={oState.open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
