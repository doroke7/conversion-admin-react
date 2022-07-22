import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import administrator from '@/images/administrator.png';

import style from './style';

function Right(oProps: any) {
  let oClasses = style(void 0);

  return (
    <div className={oClasses.right}>
      <div className={oClasses.avatarWrapper}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          className={oClasses.badge}
          variant="dot">
          <Avatar src={administrator}></Avatar>
        </Badge>
      </div>
    </div>
  );
}

export default withRouter(Right);
