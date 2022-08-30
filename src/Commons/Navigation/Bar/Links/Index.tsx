import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Components from '@/Components/Index';
import events from '@/events/index';
import Contexts from '@/Contexts/Index';

import style from './style';

function Links(oProps: any) {
  let oClasses = style(void 0);
  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;
  let aApps = oProps.apps ?? [];

  let aLinks = oProps.links;
  let cHandleClickLink = (oLink) => {
    return (oEvent) => {
      if (-1 == iIndex) {
        events.admin.emit('Navigation-onPreClickLink', oLink);

        return;
      }
      events.admin.emit('Navigation-onClickLink', oLink);
    };
  };

  return (
    <>
      <span className={oClasses.root}>
        {aLinks.map((oLink, sIndex) => (
          <Tooltip key={sIndex} className={oClasses.toolTip} title={oLink.text} arrow>
            <IconButton className={oClasses.iconButton} onClick={cHandleClickLink(oLink)}>
              <Components.Icon name={oLink.icon} className={oClasses.icon} />
            </IconButton>
          </Tooltip>
        ))}
      </span>
    </>
  );
}

export default Links;
