import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';

import style from './style';

function AdminUserLinks(oProps: any) {
  let oClasses = style(void 0);
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let aLinks = oProps.links;
  let cHandleClickLink = (oLink) => {
    return (oEvent) => {
      events.emit('Navigation-onClickLink', oLink);
    };
  };

  return (
    <>
      <span className={oClasses.root}>
        {aLinks.map((oLink, sIndex) => (
          <Tooltip key={sIndex} className={oClasses.toolTip} title={oLink.name} arrow>
            <IconButton className={oClasses.iconButton} onClick={cHandleClickLink(oLink)}>
              <Components.Icon name={'AddBoxIcon'} className={oClasses.icon} />
            </IconButton>
          </Tooltip>
        ))}
      </span>
    </>
  );
}

export default AdminUserLinks;
