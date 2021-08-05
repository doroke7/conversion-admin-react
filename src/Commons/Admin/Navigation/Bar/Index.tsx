import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import CONFIGS from '@/CONFIGS/';

import style from './style';

import administrator from '@/images/administrator.png';

function Bar(oProps: any) {
  let classes = style(void 0);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: oProps.open
      })}
    >
      <Toolbar className={clsx(classes.toolbar)}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={oProps.handleDrawerOpen}
          edge="start"
          className={clsx(classes.iconButton, {
            [classes.hide]: oProps.open
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={clsx(classes.typography)}>
          {CONFIGS.APP.NAME}
        </Typography>
        <Avatar src={administrator} className={classes.avatar}></Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Bar);
