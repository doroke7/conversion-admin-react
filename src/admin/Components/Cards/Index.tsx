import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import LoadingIcon from './../LoadingIcon/Index';
import InIcon from './../InIcon/Index';

import cStyle from './style';

function Cards(oProps: any) {
  let oClasses = cStyle();

  let aRows = oProps.rows ?? [];
  let Card = oProps.Card ?? (() => <></>);
  let bLoading = oProps.loading ?? false;

  let Componet = <div></div>;
  Componet = bLoading ? (
    <div className={oClasses.iconWrapper}>
      <LoadingIcon className={oClasses.loadingIcon}></LoadingIcon>{' '}
    </div>
  ) : (
    Componet
  );
  Componet =
    !bLoading && aRows?.length == 0 ? (
      <div className={oClasses.iconWrapper}>
        <InIcon className={oClasses.inIcon}></InIcon>
        <div className={oClasses.text}>─暂无数据─</div>
      </div>
    ) : (
      Componet
    );

  Componet =
    !bLoading && aRows?.length >= 1 ? (
      <div className={oClasses.cardsWrapper}>
        {aRows.map((oRow, iIndex) => (
          <Card key={iIndex} row={oRow}></Card>
        ))}
      </div>
    ) : (
      Componet
    );

  return <div className={oClasses.root}>{Componet}</div>;
}

/**
 * NOTE: 使用 多个三元一层运算 取代 嵌套三元运算
 */
export default Cards;
