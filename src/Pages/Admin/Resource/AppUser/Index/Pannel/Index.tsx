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

import cStyle from './style';

function Pannel(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return (
    <FormControl>
      <TextField id="filled-helperText" label="用户ID" defaultValue="" helperText="请输入数字" variant="outlined" />
    </FormControl>
  );
}

export default Pannel;
