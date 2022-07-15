import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function ScrollableTabsButtonAuto() {
  const oClasses = useStyles();
  const [iValue, cSetValue] = React.useState(0);

  let aTabs = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
  let cHandleChange = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    cSetValue(iValue);
  };

  return (
    <div className={oClasses.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={iValue}
          onChange={cHandleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          {aTabs.map((sTab, sIndex) => (
            <Tab
              key={sIndex}
              label={sTab}
              id={'scrollable-auto-tab-' + sIndex}
              aria-controls={`scrollable-auto-tabpanel-${sIndex}`}
            />
          ))}
        </Tabs>
      </AppBar>
      {aTabs.map((sTab, sIndex) => (
        <TabPanel key={sIndex} value={iValue} index={sIndex}>
          {'内容:' + sTab}
        </TabPanel>
      ))}
    </div>
  );
}

export default ScrollableTabsButtonAuto;
