import React, { useEffect, useLayoutEffect } from 'react';
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

  return (
    <div>
      <div>B</div>
      <C></C>
    </div>
  );
}
export default B;
