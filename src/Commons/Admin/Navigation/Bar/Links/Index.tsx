import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Components from '@/Components';

import style from './style';

function Links(oProps: any) {
  let oClasses = style(void 0);
  let aLinks = oProps.links;

  return (
    <span className={oClasses.root}>
      {aLinks.map((oLink, sIndex) => (
        <Tooltip key={sIndex} className={oClasses.toolTip} title={oLink.text} arrow>
          <ListItemIcon className={oClasses.listItemIcon}>
            <Components.Admin.Icon name={oLink.icon} />
          </ListItemIcon>
        </Tooltip>
      ))}
    </span>
  );
}

export default withRouter(Links);
