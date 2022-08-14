import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import cStyle from './style';

function RefreshIcon(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return (
    <svg
      className={clsx({}, sClassName)}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="16301">
      <path
        d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m205.653333-210.090667A298.666667 298.666667 0 0 0 385.365333 241.408l41.6 74.88A213.333333 213.333333 0 0 1 725.333333 512h-128l120.32 216.576z m-79.018666 54.016l-41.6-74.88A213.333333 213.333333 0 0 1 298.666667 512h128L306.346667 295.424a298.666667 298.666667 0 0 0 332.288 487.168z"
        p-id="16302"></path>
    </svg>
  );
}

export default RefreshIcon;
