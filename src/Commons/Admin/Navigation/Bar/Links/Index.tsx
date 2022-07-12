import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Components from '@/Components';

import style from './style';

function Links(oProps: any) {
  let oClasses = style(void 0);
  let aLinks = oProps.links;

  return (
    <span>
      <ListItemIcon className={oClasses.listItemIcon}>
        <Components.Admin.Icon name="AssignmentIndOutlinedIcon" />
      </ListItemIcon>
      <ListItemIcon className={oClasses.listItemIcon}>
        <Components.Admin.Icon name="AssignmentIndOutlinedIcon" />
      </ListItemIcon>
    </span>
  );
}

export default withRouter(Links);
