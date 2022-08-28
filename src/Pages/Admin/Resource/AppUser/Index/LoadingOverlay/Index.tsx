import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Components from '@/Components/Index';
import cStyle from './style';

function NoRowsOverlay(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return (
    <GridOverlay className={oClasses.root}>
      <Components.Admin.LoadingIcon className={oClasses.icon}></Components.Admin.LoadingIcon>
    </GridOverlay>
  );
}

export default NoRowsOverlay;
