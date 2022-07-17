import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Box from '@material-ui/core/Box';
import Components from '@/Components';
import TabPanel from './TabPannel/Index';
import Empty from './Empty/Index';

import style from './style';

interface Props {
  tabs: any;
}

function ScrollableTabs(oProps: any) {
  let oClasses: any = style(void 0);

  return (
    <div className={oClasses.root}>
      {oProps.tabs.length >= 1 ? (
        <>
          {/* {'两个 elements 不能在 short if 里面'} */}
          <AppBar position="static" color="default">
            <Tabs
              value={oProps.value}
              onChange={oProps.onChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example">
              {oProps.tabs.map((oTab, sIndex) => (
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
                      <IconButton size="small" onClick={oProps.onRemove(sIndex)}>
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
          {oProps.tabs.map((oTab, sIndex) => (
            <TabPanel key={sIndex} value={oProps.value} index={sIndex}>
              {'内容:' + oTab.content}
            </TabPanel>
          ))}
        </>
      ) : (
        <Empty></Empty>
      )}
    </div>
  );
}

export default ScrollableTabs;
