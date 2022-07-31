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
  let aTabs = useContext(Contexts.Admin.Tabs);
  let iTabsValue = useContext(Contexts.Admin.TabsValue);

  let [oState, cSetState] = React.useState<any>({
    anchor: null,
    contextMenu: false,
    tooltip: null,
    tooltips: {},
    index: -1 // 当下右键 选择 的  Tab , 为了定位 Dropdown "关闭当下" 需要的是哪个
  });

  let cHandleRemoveTab = (sIndex) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
      cSetState({ anchor: null, contextMenu: false, tooltips: {}, index: -1 });

      events.admin.emit('Navigation-onRemoveTab', sIndex);
    };
  };

  let cHandleRemoveOtherTabs = (sIndex) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
      cSetState({ anchor: null, contextMenu: false, tooltips: {}, index: 0 });

      events.admin.emit('Navigation-onRemoveOtherTabs', sIndex);
    };
  };

  let cHandleRemoveAllTabs = (oEvent: React.MouseEvent) => {
    oEvent.stopPropagation(); // 取消 link
    oEvent.preventDefault(); // 取消 a tag 取消 href
    cSetState({ anchor: null, contextMenu: false, tooltips: {}, index: -1 });
    events.admin.emit('Navigation-onRemoveAllTabs', null);
  };

  let cHandleChangeTab = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    events.admin.emit('Navigation-onClickTab', iValue);
  };

  let cHandleContextmenu = (iIndex: any) => {
    return (oEvent: any) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
      let oAnchor = oEvent.currentTarget;
      cSetState({ anchor: oAnchor, contextMenu: false, tooltips: {}, index: iIndex });
      cSetState({ anchor: oAnchor, contextMenu: true, tooltips: {}, index: iIndex });
    };
  };

  let cHandleCloseContextmenu = (oEvent: any) => {
    // 如果 三级 菜单 有被锚点， 且 点击的 dom 包含 当下的 三级菜单就 不做事

    cSetState({ ...oState, anchor: false, contextMenu: false, tooltips: {}, index: -1 });
  };

  let cHandleMouseEnter = (iIndex: any) => {
    return (oEvent: any) => {
      if (!oState.contextMenu) {
        setTimeout(() => {
          let oTooltips = {
            [iIndex]: true
          };
          cSetState({ ...oState, tooltips: oTooltips });
        }, 100);
      }
    };
  };

  let cHandleMouseLeave = (iIndex: any) => {
    return (oEvent: any) => {
      setTimeout(() => {
        let oTooltips = {};

        cSetState({ ...oState, tooltips: oTooltips });
      }, 101);
    };
  };

  return (
    <div className={oClasses.root}>
      {aTabs.length >= 1 ? (
        <>
          <AppBar position="static" color="default">
            <Tabs
              className={oClasses.tabs}
              value={iTabsValue}
              onChange={cHandleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example">
              {aTabs.map((oTab, sIndex) => (
                <Tooltip
                  onMouseEnter={cHandleMouseEnter(sIndex)}
                  disableFocusListener
                  disableTouchListener
                  key={sIndex}
                  open={oState.tooltips?.[sIndex] !== undefined}
                  className={oClasses.toolTip}
                  title={oTab.text + ''}
                  placement="bottom"
                  arrow>
                  <Tab
                    onContextMenu={cHandleContextmenu(sIndex)}
                    onMouseLeave={cHandleMouseLeave(sIndex)}
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
            <Dropdown
              open={oState.contextMenu}
              anchor={oState.anchor}
              onClickAway={cHandleCloseContextmenu}
              onRemoveTab={cHandleRemoveTab(oState.index)}
              onRemoveOtherTabs={cHandleRemoveOtherTabs(oState.index)}
              onRemoveAllTabs={cHandleRemoveAllTabs}></Dropdown>
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
