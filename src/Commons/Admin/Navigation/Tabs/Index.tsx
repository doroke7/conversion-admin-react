import React, { useState, createContext, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

import Contexts from '@/Contexts';
import Components from '@/Components';
import events from '@/events';

import TabPanel from './TabPannel/Index';
import Empty from './Empty/Index';
import Dropdown from './Dropdown/Index';

import style from './style';

function ScrollableTabs(oProps: any) {
  let oClasses: any = style(void 0);
  const aTabs = useContext(Contexts.Admin.Tabs);
  const iTabsValue = useContext(Contexts.Admin.TabsValue);

  let [oState, cSetState] = React.useState<any>({
    anchor: null,
    contextMenu: false,
    tooltip: null,
    tooltips: {}
  });

  let cHandleRemoveTab = (sIndex) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
      events.admin.emit('Navigation-onRemoveTab', sIndex);
    };
  };

  let cHandleChangeTab = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    events.admin.emit('Navigation-onClickTab', iValue);
  };

  let cHandleContextmenu = (oEvent: any) => {
    oEvent.stopPropagation(); // 取消 link
    oEvent.preventDefault(); // 取消 a tag 取消 href
    let oAnchor = oEvent.currentTarget;
    cSetState({ anchor: oAnchor, contextMenu: false, tooltip: null });
    cSetState({ anchor: oAnchor, contextMenu: true, tooltip: null });
  };

  let cHandleCloseContextmenu = (oEvent: any) => {
    // 如果 三级 菜单 有被锚点， 且 点击的 dom 包含 当下的 三级菜单就 不做事

    cSetState({ ...oState, anchor: false, contextMenu: false, tooltip: null });
  };

  return (
    <div className={oClasses.root}>
      {aTabs.length >= 1 ? (
        <>
          {/* {'两个 elements 不能在 short if 里面'} */}
          <AppBar position="static" color="default">
            <Tabs
              value={iTabsValue}
              onChange={cHandleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example">
              {aTabs.map((oTab, sIndex) => (
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  key={sIndex}
                  // open={oState.tooltips[sIndex] !== undefined}
                  className={oClasses.toolTip}
                  title={oTab.text}
                  placement="bottom"
                  arrow>
                  <Tab
                    onContextMenu={cHandleContextmenu}
                    className={oClasses.tab}
                    key={sIndex}
                    label={
                      <span>
                        <ListItemIcon className={oClasses.listItemIcon}>
                          <Components.Admin.Icon name={oTab.icon} />
                        </ListItemIcon>
                        <span className={oClasses.listITemText}>{oTab.text}</span>
                        {/* {'关闭TAB 的按钮可能会冒泡点击事件'} */}
                        <IconButton size="small" onClick={cHandleRemoveTab(sIndex)}>
                          <CloseIcon />
                        </IconButton>
                      </span>
                    }
                    id={'scrollable-auto-tab-' + sIndex}
                    aria-controls={`scrollable-auto-tabpanel-${sIndex}`}
                  />
                </Tooltip>
              ))}
            </Tabs>
            <Dropdown open={oState.contextMenu} anchor={oState.anchor} onClickAway={cHandleCloseContextmenu}></Dropdown>
          </AppBar>
          {aTabs.map((oTab, sIndex) => (
            <TabPanel key={sIndex} value={iTabsValue} index={sIndex}>
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
