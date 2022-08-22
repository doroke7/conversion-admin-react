import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import cStyle from './style';

function Pannel(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return (
    <FormGroup className={oClasses.root} row={true}>
      <TextField className={oClasses.id} id="id" label="用户ID" variant="filled" size="small" />
      <TextField className={oClasses.username} id="username" label="用户昵称" variant="filled" size="small" />
    </FormGroup>
  );
}

export default Pannel;
