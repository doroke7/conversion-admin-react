import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Avatar from '@material-ui/core/Avatar';

import Helpers from '@/Helpers';

import Components from '@/Components';
import events from '@/events';

import cStyle from './style';

function Icon(oProps: any) {
  const oClasses = cStyle();
  let cRandomColor = () => {
    let oHex = Math.floor(Math.random() * 0xffffff);
    let sColor = '#' + oHex.toString(16);

    return sColor;
  };

  let sName = oProps.name || '';
  return (
    <Avatar className={oClasses.root} style={{ backgroundColor: cRandomColor() }}>
      {sName}
    </Avatar>
  );
}

export default Icon;
