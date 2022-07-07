import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import fStyles from './style';

export default function MenuListComposition() {
  const oClasses = fStyles();

  const [sAge, cSetAge] = React.useState('');
  const cHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    cSetAge(event.target.value as string);
  };

  /*
    NOTE: <Select></Select> 有三种说明
    1. 在输入框左上角。有一个说明 这个叫做 Input Label ，由 <InputLabel> 实现
    2. 在输入框选择列表里面。有一个预设不能选择的 列，这个由 <MenuItem><em>NONE</em></MenuItem> 实现
    3. 在输入框下方。 有一段说明文字，这个由 <FormHelperText> 实现
  */
  return (
    <div>
      <FormControl variant="filled" className={oClasses.formControl}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sAge}
          onChange={cHandleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={oClasses.formControl}>
        <Select value={sAge} onChange={cHandleChange} inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value="" disabled>
            Pla
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Ploooo</FormHelperText>
      </FormControl>
    </div>
  );
}
