import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import Avatar from '@material-ui/core/Avatar';

import CONFIGS from '@/CONFIGS/';

import style from './style';

import administrator from '@/images/administrator.png';

function Bar(oProps: any) {
  let oClasses = style(void 0);
  const [sAppId, cSetAppId] = React.useState('');

  const cHandleChange = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    cSetAppId(oEvent.target.value as string);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(oClasses.appBar, {
        [oClasses.appBarShift]: oProps.open
      })}>
      <Toolbar className={clsx(oClasses.toolbar)}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={oProps.handleDrawerOpen}
          edge="start"
          className={clsx(oClasses.iconButton, {
            [oClasses.hide]: oProps.open
          })}>
          <MenuIcon />
        </IconButton>
        {/* 点击右边的 App-Icon */}
        <Typography variant="h6" noWrap className={clsx(oClasses.typography)}></Typography>
        <FormControl variant="outlined" className={oClasses.formControl}>
          <Select
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            inputProps={{ 'aria-label': 'Without label' }}
            className={oClasses.select}
            onChange={cHandleChange}
            value={sAppId}>
            <MenuItem className={oClasses.menuItem} value="" disabled>
              <em>分包选择</em>
            </MenuItem>
            <MenuItem className={oClasses.menuItem} value={1}>
              加菲影视
            </MenuItem>
            <MenuItem className={oClasses.menuItem} value={2}>
              青山影视
            </MenuItem>
            <MenuItem className={oClasses.menuItem} value={3}>
              松鼠影视
            </MenuItem>
          </Select>
        </FormControl>
        <Avatar src={administrator} className={oClasses.avatar}></Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Bar);
