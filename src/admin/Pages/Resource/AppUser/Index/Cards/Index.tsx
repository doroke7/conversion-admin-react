import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import Components from '@/admin/Components/Index';

import cStyle from './style';

function Cards(oProps: any) {
  let oClasses = cStyle();

  let aRows = oProps.rows ?? [];
  let Card = oProps.Card ?? <></>;
  let bLoading = oProps.loading ?? false;

  return (
    <div className={oClasses.root}>
      {bLoading ? <></> : aRows.map((oRow, iIndex) => <Card key={iIndex} row={oRow}></Card>)}
    </div>
  );
}

export default Cards;
