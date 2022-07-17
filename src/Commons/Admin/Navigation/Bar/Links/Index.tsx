import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Components from '@/Components';
import events from '@/events';

import style from './style';

function Links(oProps: any) {
  let oClasses = style(void 0);
  let aLinks = oProps.links;
  let cHandleClick = (oLink) => {
    return (oEvent) => {
      events.admin.emit('onClickLink', oLink);
    };
  };

  return (
    <span className={oClasses.root}>
      {aLinks.map((oLink, sIndex) => (
        <Tooltip key={sIndex} className={oClasses.toolTip} title={oLink.text} arrow>
          <IconButton className={oClasses.iconButton} onClick={cHandleClick(oLink)}>
            <Components.Admin.Icon name={oLink.icon} className={oClasses.icon} />
          </IconButton>
        </Tooltip>
      ))}
    </span>
  );
}

export default withRouter(Links);
