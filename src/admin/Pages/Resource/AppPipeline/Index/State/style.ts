import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, lightBlue, blue, common } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      width: '160px',
      display: 'flex',
      justifyContent: 'space-between'

    },
    step: {
      width: '7px',
      height: '20px',

    },
    stepDisable: {
      background: lightBlue[50]
    },
    stepEnable: {
      background: lightBlue[700]

    }
  })
);

export default style;
