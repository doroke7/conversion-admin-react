import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Components from '@/Components/Index';
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
    code: '',
    phoneType: '',
    vip: ''
  });

  let cHandleChangeCode = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    cSetState({ ...oState, code: oEvent.target.value as string });
  };

  let cHandleChangePhoneType = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    cSetState({ ...oState, phoneType: oEvent.target.value as string });
  };

  let cHandleChangeVip = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    cSetState({ ...oState, vip: oEvent.target.value as string });
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
          className={oClasses.selectCode}
          labelId="demo-simple-select-outlined-label"
          id="code"
          value={oState.code}
          onChange={cHandleChangeCode}
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
      <FormControl variant="outlined" className={clsx([oClasses.formControl, oClasses.formControlPhoneType])}>
        <InputLabel id="select-outlined-label" shrink={true}>
          设备
        </InputLabel>
        <Select
          className={oClasses.selectPhoneType}
          labelId="select-outlined-label"
          id="phone_type"
          value={oState.phoneType}
          onChange={cHandleChangePhoneType}
          autoWidth={true}
          variant="outlined"
          displayEmpty={true}
          label="phone_type">
          <MenuItem value="">
            <span className={oClasses.selectEmpty}>请选择设备</span>
          </MenuItem>
          <MenuItem value="1">
            <Components.Admin.AndroidIcon className={oClasses.icon}></Components.Admin.AndroidIcon>
            &ensp;
            <span>安卓设备</span>
          </MenuItem>
          <MenuItem value="2">
            <Components.Admin.AppleIcon className={oClasses.icon}></Components.Admin.AppleIcon>
            &ensp;
            <span>苹果设备</span>
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={clsx([oClasses.formControl, oClasses.formControlVip])}>
        <InputLabel id="select-outlined-label" shrink={true}>
          用户特权
        </InputLabel>
        <Select
          className={oClasses.selectVip}
          labelId="select-outlined-label"
          id="vip"
          value={oState.vip}
          onChange={cHandleChangeVip}
          autoWidth={true}
          variant="outlined"
          displayEmpty={true}
          label="vip">
          <MenuItem value="">
            <span className={oClasses.selectEmpty}>请选择特权</span>
          </MenuItem>
          <MenuItem value="0">
            <Components.Admin.VipIcon0 className={oClasses.icon}></Components.Admin.VipIcon0>
            &ensp;
            <span>特权一般</span>
          </MenuItem>
          <MenuItem value="1">
            <Components.Admin.VipIcon1 className={oClasses.icon}></Components.Admin.VipIcon1>
            &ensp;
            <span>特权过期</span>
          </MenuItem>
          <MenuItem value="2">
            <Components.Admin.VipIcon2 className={oClasses.icon}></Components.Admin.VipIcon2>
            &ensp;
            <span>特权限时</span>
          </MenuItem>
          <MenuItem value="3">
            <Components.Admin.VipIcon3 className={oClasses.icon}></Components.Admin.VipIcon3>
            &ensp;
            <span>特权永久</span>
          </MenuItem>
        </Select>
      </FormControl>
    </FormGroup>
  );
}

export default Pannel;
