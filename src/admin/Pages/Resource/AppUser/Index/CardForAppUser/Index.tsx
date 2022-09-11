import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import Components from '@/admin/Components/Index';

import cStyle from './style';

function CardForAppUser(oProps: any) {
  let oClasses = cStyle();

  let oRow = oProps.row ?? {};

  return (
    <Card raised={false} className={oClasses.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={oClasses.avatar}>
            R
          </Avatar>
        }></CardHeader>
      <CardContent>CARD</CardContent>
    </Card>
  );
}

export default CardForAppUser;
