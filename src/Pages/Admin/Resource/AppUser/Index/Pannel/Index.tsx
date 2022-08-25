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

import CONFIGS from '@/CONFIGS/INDEX';
import cStyle from './style';

function Pannel(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  let [oState, cSetState] = useState<any>({
    number: 0,
    count: 0,
    loading: true,
    rows: [],
    code: ''
  });

  let cHandleChange = (sCode) => {
    return (oEvent: any) => {
      console.info(sCode);
      cSetState({ ...oState, code: sCode });
    };
  };

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
        <InputLabel id="demo-simple-select-outlined-label" shrink={true}>
          国家
        </InputLabel>
        <Select
          className={oClasses.select}
          labelId="demo-simple-select-outlined-label"
          id="code"
          value={oState.code}
          onChange={cHandleChange}
          autoWidth={true}
          variant="outlined"
          displayEmpty={true}
          label="code">
          <MenuItem value="">
            <span className={oClasses.selectEmpty}>请选择国家</span>
          </MenuItem>
          {CONFIGS.APP.CODES.map((oCode: any, sKey) => (
            <MenuItem key={sKey} value={oCode.code}>
              {oCode.cn + ' (' + oCode.code + ')'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={oClasses.startDate}
        id="start_datetime"
        label="开始时间"
        type="datetime-local"
        defaultValue=""
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
      <TextField
        className={oClasses.endDate}
        id="end_datetime"
        label="结束时间"
        type="datetime-local"
        defaultValue=""
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
    </FormGroup>
  );
}

export default Pannel;
