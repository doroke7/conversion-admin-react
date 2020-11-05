import React, { useState, useEffect, useContext } from 'react';
import { useMappedState, useDispatch, StoreContext } from 'redux-react-hook';
import { useSelector, useStore } from 'react-redux';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import Commons from '@/Commons';
import Components from '@/Components';

import style from './style';

interface State {
  words: any[];
}

function Do(): any {
  let classes: any = style(void 0);
  let dispatch = useDispatch();
  let [oState, setState] = useState<State>({
    words: []
  });
  // let aWords = useSelector((_oState: any) => {
  //   let aWords = _oState.words;
  //   return aWords;
  // })

  async function showWord() {
    try {
      let oOptions = {
        type: 'admin'
      };
      // await dispatch(word.show(void 0, oOptions));
    } catch (oExeption) {
      oExeption;
    }
  }
  useEffect(() => {
    showWord();
  });

  return (
    <div className={classes.root}>
      <Commons.Admin.Menu>
        <Paper className={classes.paper}>
          <Components.Admin.Table />
        </Paper>
      </Commons.Admin.Menu>
    </div>
  );
}
export default Do;
