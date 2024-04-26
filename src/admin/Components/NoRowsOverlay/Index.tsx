import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Components from '@/admin/Components/Index';
import InIcon from './../InIcon/Index';

import cStyle from './style';

function NoRowsOverlay(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return (
    <GridOverlay className={oClasses.root}>
      <div className={oClasses.zoom}>
        <InIcon className={oClasses.icon}></InIcon>
        <div className={oClasses.text}>⎯暂无数据⎯</div>
      </div>
    </GridOverlay>
  );
}

export default NoRowsOverlay;
