import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  })
);

export default function MenuListComposition() {
  const classes = useStyles();

  let aUsers = ['A', 'B', '233'];

  let aDoms = aUsers.map((number) => <li key={number.toString()}>{number}</li>);

  return aUsers.map((number) => <li key={number.toString()}>{number}</li>);
}
