import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import ReactCountryFlag from 'react-country-flag';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import Components from '@/admin/Components/Index';
import CONFIGS from '@/CONFIGS/INDEX';
import cStyle from './style';

function SearchPannel(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';
  let children = oProps.children ?? <></>;

  return <div>{children}</div>;
}

export default SearchPannel;
