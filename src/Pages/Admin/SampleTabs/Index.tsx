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

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
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
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={iValue} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={iValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={iValue} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={iValue} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={iValue} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={iValue} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={iValue} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}

export default ScrollableTabsButtonAuto;
