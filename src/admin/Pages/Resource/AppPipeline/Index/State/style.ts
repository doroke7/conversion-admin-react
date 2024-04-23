import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, lightBlue, blue, red, common } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      width: '160px',
      display: 'flex',
      justifyContent: 'space-between'

    },
    outerBlock: {
      width: '7px',
      height: '20px',
      background: lightBlue[50],
      position: 'relative',
    },
    innerBlock: {
      width: '7px',
      background: lightBlue[700],
      position: 'absolute',
      left: oTheme.spacing(0),
      bottom: oTheme.spacing(0),
    },
    innerBlockFail: {
      height: '20px',
      background: red[700],

    },
    innerBlockNone: {
      height: '0px',

    },
    innerBlockOnging: {
      height: '12px',

    },
    innerBlockSuccess: {
      height: '20px',

    },

  })
);

export default style;
