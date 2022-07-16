import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Components from '@/Components';
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

function ScrollableTabs() {
  let aTabsRows = [
    {
      text: '会员列表',
      icon: 'AssignmentIndOutlinedIcon',
      content: 'AppUser'
    },
    {
      text: '订单列表',
      icon: 'PlaylistAddCheckOutlinedIcon',
      content: 'OrderInnfo'
    },
    {
      text: '平台配置',
      icon: 'BorderAllOutlinedIcon',
      content: 'Config'
    },
    {
      text: '剧集列表',
      icon: 'VideocamOutlinedIcon',
      content: 'Vod'
    }
  ];
  const oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState<any>({
    value: 0,
    tabs: aTabsRows
  });

  let cHandleChange = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    cSetState({ ...oState, value: iValue });
  };

  let cHandleCloseIcon = (iIndex: number) => {
    // test
    return (oEvent) => {
      oEvent.stopPropagation();
      let aTabsRows1 = oState.tabs.slice(0, iIndex);
      let aTabsRows2 = oState.tabs.slice(iIndex + 1, oState.tabs.length);
      let aTabs = aTabsRows1.concat(aTabsRows2);
      // 如果当下关闭的 tab 大于 当下启用的 tab => 当下启用的 tab 不变
      // 如果当下关闭的 tab 小于等于 当下启用的 tab => 当下启用的 tab 往前移动一个
      let iValue = 0;
      iValue = iIndex > oState.value ? oState.value : oState.value - 1;
      iValue = iValue < 0 ? 0 : iValue;
      cSetState({ ...oState, value: iValue, tabs: aTabs });
    };
  };

  return (
    <div className={oClasses.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={oState.value}
          onChange={cHandleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          {oState.tabs.map((oTab, sIndex) => (
            <Tab
              className={oClasses.tab}
              key={sIndex}
              label={
                <span>
                  <ListItemIcon className={oClasses.listItemIcon}>
                    <Components.Admin.Icon name={oTab.icon} />
                  </ListItemIcon>
                  <span className={oClasses.listITemText}>{oTab.text}</span>
                  {/* {'关闭TAB 的按钮可能会冒泡点击事件'} */}
                  <IconButton className={oClasses.iconButton} size="small" onClick={cHandleCloseIcon(sIndex)}>
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
      {oState.tabs.map((oTab, sIndex) => (
        <TabPanel key={sIndex} value={oState.value} index={sIndex}>
          {'内容:' + oTab.content}
        </TabPanel>
      ))}
    </div>
  );
}

export default ScrollableTabs;
