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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Badge from '@material-ui/core/Badge';

import Avatar from '@material-ui/core/Avatar';
import Components from '@/Components';

import CONFIGS from '@/CONFIGS/';
import Links from './Links/Index';
import Right from './Right/Index';

import style from './style';

import administrator from '@/images/administrator.png';

function Bar(oProps: any) {
  let oClasses = style(void 0);

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
        <Links links={CONFIGS.LINKS}></Links>
        <Right></Right>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Bar);
