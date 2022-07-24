import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Components from '@/Components';
import events from '@/events';
import Contexts from '@/Contexts';
import AlertOfApps from './AlertOfApps';

import style from './style';

function Links(oProps: any) {
  let oClasses = style(void 0);
  let iIndex = -1;
  let [oState, cSetState] = React.useState<any>({
    open: false,
    onConfirm: () => void 0
  });

  let aLinks = oProps.links;
  let cHandleClickLink = (oLink) => {
    return (oEvent) => {
      if (-1 == iIndex) {
        let cHandleConfirm = () => {
          events.admin.emit('Navigation-onClickLink', oLink);
          cSetState({ ...oState, open: false });
        };
        cSetState({ ...oState, open: true, onConfirm: cHandleConfirm });
        return;
      }
      events.admin.emit('Navigation-onClickLink', oLink);
    };
  };

  let cHandleClose = () => {
    cSetState({ ...oState, open: false });
  };

  return (
    <>
      <span className={oClasses.root}>
        {aLinks.map((oLink, sIndex) => (
          <Tooltip key={sIndex} className={oClasses.toolTip} title={oLink.text} arrow>
            <IconButton className={oClasses.iconButton} onClick={cHandleClickLink(oLink)}>
              <Components.Admin.Icon name={oLink.icon} className={oClasses.icon} />
            </IconButton>
          </Tooltip>
        ))}
      </span>
      <AlertOfApps open={oState.open} onClose={cHandleClose} onConfirm={oState.onConfirm}></AlertOfApps>
    </>
  );
}

export default withRouter(Links);
