import React, { useContext, useEffect, useLayoutEffect } from 'react';
import C from './C/Index';
import style from './style';

function B(oProps: any): any {
  let oClasses: any = style(void 0);
  console.info('B init');

  useEffect(() => {
    console.info('B useEffect');
  }, []);

  useLayoutEffect(() => {
    console.info('B useLayoutEffect');
  }, []);

  let [oState, cSetState] = React.useState<any>({
    value: 0,
    status: false
  });

  return (
    <div>
      <div>B</div>
      <C></C>
    </div>
  );
}
export default B;
