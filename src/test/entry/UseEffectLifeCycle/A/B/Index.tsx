import React, { useEffect, useLayoutEffect } from 'react';
import C from './C/Index';
import style from './style';

function B(oProps: any): any {
  let oClasses: any = style(void 0);

  useEffect(() => {
  }, []);

  useLayoutEffect(() => {
  }, []);

  return (
    <div>
      <div>B</div>
      <C></C>
    </div>
  );
}
export default B;
