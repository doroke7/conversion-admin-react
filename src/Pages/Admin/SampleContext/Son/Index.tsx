import React, { createContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Components from '@/Components';
import GrandSon from './GrandSon/Index';
import style from './style';

function Son() {
  const oClasses: any = style(void 0);
  let ValueContext = createContext('value');

  return (
    <div className={oClasses.root}>
      <GrandSon></GrandSon>
    </div>
  );
}

export default Son;
