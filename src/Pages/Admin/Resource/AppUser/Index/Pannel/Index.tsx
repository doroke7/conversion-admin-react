import React, { useState } from 'react';
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

  let [oState, cSetState] = useState<any>({
    number: 0,
    count: 0,
    loading: true,
    rows: []
  });

  let cHandleChange = () => {};

  return (
    <FormGroup className={oClasses.root} row={true}>
      <TextField
        className={oClasses.id}
        id="id"
        label="用户ID"
        placeholder="请输入数字"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
      <TextField
        className={oClasses.username}
        id="username"
        label="用户昵称"
        placeholder="请输入文字"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
      <FormControl variant="outlined" className={oClasses.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </FormGroup>
  );
}

export default Pannel;
