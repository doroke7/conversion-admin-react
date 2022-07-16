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
import style from './style';

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

function ScrollableTabsButtonAuto() {
  const oClasses: any = style(void 0);
  const [iValue, cSetValue] = React.useState(0);

  let aTabs = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21st',
    '22nd',
    '23rd',
    '24th',
    '25th',
    '26th',
    '27th',
    '28th',
    '29th',
    '30th',
    '31st'
  ];
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
