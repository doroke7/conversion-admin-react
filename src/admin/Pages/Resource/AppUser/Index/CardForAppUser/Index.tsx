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
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import Components from '@/admin/Components/Index';

import cStyle from './style';

function CardForAppUser(oProps: any) {
  let oClasses = cStyle();

  let oRow = oProps.row ?? {};

  let sPic = oRow.pic ?? '';
  let sUsername = oRow.username ?? '';
  let sId = oRow.id ?? '';
  let sCodeNumber = oRow.code_number ?? '';
  let sLoginIp = oRow.login_ip ?? '';

  let VipIcon = Components.VoidElement;
  VipIcon = oRow.vip == 1 ? Components.VipIcon1 : VipIcon;
  VipIcon = oRow.vip == 2 ? Components.VipIcon2 : VipIcon;
  VipIcon = oRow.vip == 3 ? Components.VipIcon3 : VipIcon;

  let PhoneTypeIcon = Components.VoidElement;
  PhoneTypeIcon = oRow.phone_type == 1 ? Components.AndroidIcon : PhoneTypeIcon;
  PhoneTypeIcon = oRow.phone_type == 2 ? Components.AppleIcon : PhoneTypeIcon;

  return (
    <Card raised={false} className={oClasses.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={oClasses.avatar}>
            {sUsername.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={sId}
        subheader={sUsername}></CardHeader>
      <CardMedia className={oClasses.cardMedia} image={sPic} title={sUsername} />
      <CardContent>
        <Typography>
          <VipIcon className={oClasses.badgeIcon}></VipIcon>
          <PhoneTypeIcon className={oClasses.badgeIcon}></PhoneTypeIcon>
        </Typography>
        <Typography>{sCodeNumber}</Typography>
      </CardContent>
    </Card>
  );
}

export default CardForAppUser;
