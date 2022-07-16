import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Components from '@/Components';
import style from './style';

interface Props {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: Props) {
  const oClasses: any = style(void 0);

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={oClasses.root}
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
