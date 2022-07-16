import React, { useState, createContext, useContext } from 'react';
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
import style from './style';
import UserContext from './../Contexts/User/Index';
/**
 * NOTE: Context 必须在 src/Context/Admin 里面 宣告 共用的 context 然后 在不同的 '个别' Commponet 使用
 * Example: UserContext 是成功的， PostitionContext 失效
 */

const PositionContext = createContext('Position');

function Son() {
  const oUser = useContext(UserContext);
  const position = useContext(PositionContext);

  return (
    <>
      <span>Component 5 (利用 context 传值): </span>
      <span>{`Hello ${position} ---- ${oUser.name}`}</span>
    </>
  );
}

export default Son;
