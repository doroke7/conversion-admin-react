import React, { useState, createContext, useContext } from 'react';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

import Contexts from '@/admin/Contexts/Index';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';

import TabPanel from './TabPannel/Index';
import Empty from './Empty/Index';
import Dropdown from './Dropdown/Index';

import style from './style';

function MyTabs(oProps: any) {
  let children = oProps.children ?? <></>;

  let oClasses: any = style(void 0);
  let aTabs = useContext(Contexts.Tabs) ?? [];
  let iTabsValue = useContext(Contexts.TabsValue);

  let [oStateAnchor, cSetStateAnchor] = useState<any>(null);
  let [oStateContextMenu, cSetStateContextMenu] = useState<any>(false);
  let [oStateTooltips, cSetStateTooltips] = useState<any>({});
  let [oStateIndex, cSetStateIndex] = useState<any>(-1);

  let cHandleRemoveTab = (sIndex) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
      cSetStateAnchor(null);
      cSetStateContextMenu(false);
      cSetStateTooltips({});
      cSetStateIndex(-1);
      events.emit('Navigation-onRemoveTab', sIndex);
    };
  };

  let cHandleRemoveOtherTabs = (sIndex) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a tag 取消 href
      cSetStateAnchor(null);
      cSetStateContextMenu(false);
      cSetStateTooltips({});
      cSetStateIndex(0);
      events.emit('Navigation-onRemoveOtherTabs', sIndex);
    };
  };

  let cHandleRemoveAllTabs = (oEvent: React.MouseEvent) => {
    oEvent.stopPropagation(); // 取消 link
    oEvent.preventDefault(); // 取消 a tag 取消 href
    cSetStateAnchor(null);
    cSetStateContextMenu(false);
    cSetStateTooltips({});
    cSetStateIndex(-1);
    events.emit('Navigation-onRemoveAllTabs', null);
  };

  let cHandleChangeTab = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    events.emit('Navigation-onClickTab', iValue);
  };

  let cHandleContextmenu = (iIndex: any) => {
    return (oEvent: any) => {
      oEvent.stopPropagation(); // 改用 全局处理取消预设的 右键交互
      oEvent.preventDefault(); // 改用 全局处理取消预设的 右键交互
      let oAnchor = oEvent.currentTarget;

      cSetStateAnchor(oAnchor);
      cSetStateContextMenu(true);
      cSetStateTooltips({});
      cSetStateIndex(iIndex);
    };
  };

  let cHandleCloseContextmenu = (oEvent: any) => {
    // 如果 三级 菜单 有被锚点， 且 点击的 dom 包含 当下的 三级菜单就 不做事

    cSetStateAnchor(false);
    cSetStateContextMenu(false);
    cSetStateTooltips({});
    cSetStateIndex(-1);
  };

  let cHandleMouseEnter = (iIndex: any) => {
    return (oEvent: any) => {
      if (!oStateContextMenu) {
        let oTooltips = {
          [iIndex]: true
        };
        cSetStateTooltips(oTooltips);
      }
    };
  };

  let cHandleMouseLeave = (iIndex: any) => {
    return (oEvent: any) => {
      let oTooltips = {};
      cSetStateTooltips(oTooltips);
    };
  };

  let iTabsLength = aTabs?.length ?? 0;

  return (
    <div className={oClasses.root}>
      <div
        className={clsx(null, {
          [oClasses.mainNone]: iTabsLength == 0
        })}>
        <AppBar position="static" color="default" component="div">
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
                open={oStateTooltips?.[sIndex] && iTabsLength >= 11}
                className={oClasses.toolTip}
                title={oTab?.text + ''}
                placement="top"
                arrow
              >
                <Tab
                  onContextMenu={cHandleContextmenu(sIndex)}
                  onMouseLeave={cHandleMouseLeave(sIndex)}
                  className={oClasses.tab}
                  key={sIndex}
                  label={
                    <span>
                      <ListItemIcon className={oClasses.listItemIcon}>
                        <Components.Icon name={oTab.icon} />
                      </ListItemIcon>
                      <span
                        className={clsx(oClasses.listITemText, {
                          [oClasses.listITemText4]: iTabsLength >= 11 && iTabsLength < 12,
                          [oClasses.listITemText3]: iTabsLength >= 12 && iTabsLength < 14,
                          [oClasses.listITemText2]: iTabsLength >= 14 && iTabsLength < 15,
                          [oClasses.listITemText1]: iTabsLength >= 15 && iTabsLength < 19,
                          [oClasses.listITemText0]: iTabsLength >= 19
                        })}>
                        {oTab?.text ?? ''}
                      </span>
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
            open={oStateContextMenu}
            anchor={oStateAnchor}
            onClickAway={cHandleCloseContextmenu}
            onRemoveTab={cHandleRemoveTab(oStateIndex)}
            onRemoveOtherTabs={cHandleRemoveOtherTabs(oStateIndex)}
            onRemoveAllTabs={cHandleRemoveAllTabs}></Dropdown>
        </AppBar>
        <TabPanel value={iTabsValue}>
          {children}
        </TabPanel>
      </div>
      <Empty className={clsx(null, { [oClasses.emptyNone]: iTabsLength >= 1 })}></Empty>
    </div>
  );
}

export default MyTabs;
