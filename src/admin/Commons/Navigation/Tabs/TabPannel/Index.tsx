import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Components from '@/admin/Components/Index';
import style from './style';

interface Props {
  children?: React.ReactNode;
}

function TabPanel(props: Props) {
  let oClasses: any = style(void 0);

  let { children, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={oClasses.root}
      id={'scrollable-auto-tabpanel-0'}
      aria-labelledby={'scrollable-auto-tab-0'}
      {...other}>
      <Box className={oClasses.box}>{children}</Box>
    </div>
  );
}

export default TabPanel;
