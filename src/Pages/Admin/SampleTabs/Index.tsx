import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';

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

const cUseStyles = makeStyles((oTheme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: oTheme.palette.background.paper,
    '& .MuiTab-root': {
      [oTheme.breakpoints.up('sm')]: {
        minWidth: oTheme.spacing(5)
      }
    }
  },
  tab: {
    position: 'relative',
    paddingRight: oTheme.spacing(3),
    '&:hover': {
      '& .MuiIconButton-root': {
        opacity: 1
      }
    }
  },
  iconButton: {
    position: 'absolute',
    right: oTheme.spacing(0),
    top: '0',
    transform: 'translate(0%, 0%) scale(0.8)',
    color: grey[400],
    opacity: 0
  }
}));

function ScrollableTabsButtonAuto() {
  const oClasses = cUseStyles();
  const [iValue, cSetValue] = React.useState(0);

  let aTabs = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
  let cHandleChange = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    cSetValue(iValue);
  };

  let cHandleTab = (iValue: number) => {
    return (oEvent: React.FocusEvent<{}>) => {};
    // cSetValue(iValue);
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
              className={oClasses.tab}
              key={sIndex}
              label={
                <span>
                  {sTab}
                  <IconButton className={oClasses.iconButton} size="small" onClick={cHandleTab(sIndex)}>
                    <CloseIcon />
                  </IconButton>
                </span>
              }
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
