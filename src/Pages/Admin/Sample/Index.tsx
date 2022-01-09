import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import fStyles from './style';

export default function MenuListComposition() {
  const oClasses = fStyles();

  let [oState, cSetState] = React.useState<any>({
    open: false,
    menus: {}
  });

  let anchorRef = React.useRef<HTMLButtonElement>(null);

  let handleToggle = () => {
    cSetState({ ...oState, open: !oState.open });
  };

  let handleClose = (oEvent: React.MouseEvent<EventTarget>) => {
    // 如果 三级 菜单 有被锚点， 且 点击的 dom 包含 当下的 三级菜单就 不做事
    if (anchorRef.current && anchorRef.current.contains(oEvent.target as HTMLElement)) {
      return;
    }
    // 如果 三级 菜单 没被锚点， 且 点击的 dom 不包含 当下的 三级菜单就 关闭

    cSetState({ ...oState, open: false });
  };

  function handleListKeyDown(oEvent: React.KeyboardEvent) {
    if (oEvent.key === 'Tab') {
      oEvent.preventDefault();
      cSetState({ ...oState, open: false });
    }
  }

  let oPrevOpen = React.useRef(oState.open);
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
        <Popper open={oState.open} anchorEl={anchorRef.current} role={undefined} placement={'right-start'}>
          {
            <Grow in={true}>
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
          }
        </Popper>
      </div>
    </div>
  );
}
