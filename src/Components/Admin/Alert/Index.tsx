import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import style from './style';

interface State {
  open: boolean;
  text: string;
}

function Alert(oProps: any): any {
  let classes: any = style(void 0);

  let [oState, setState] = React.useState<State>({
    open: oProps.open,
    text: '',
  });

  React.useEffect(() => {
    setState({ ...oState, open: oProps.open });
  });

  return (
    <Dialog
      open={oState.open}
      maxWidth="sm"
      fullWidth
      onClose={oProps.onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <ErrorOutline className={classes.errorIcon}/>
        <span className={classes.title}>错误</span>
        </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {oProps.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={oProps.onClose} color="primary" autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Alert;
