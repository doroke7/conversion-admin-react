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
      boxSizing: 'border-box',
      height: '20px',
      background: pink[50],
      border: '2px dotted ' + red[200],
      animation: '$fadeIn .3s linear 0s 1 normal'

    },
    innerBlockNone: {
      height: '0%',

    },
    innerBlockOnging: {
      height: '60%',
      animation: '$scaleY60 .3s linear 0s 1 normal'

    },
    innerBlockSuccess: {
      height: '100%',
      animation: '$scaleY100 .3s linear 0s 1 normal'

    },
    '@keyframes scaleY60': {
      '0%': {
        height: '0%',
      },
      '100%': {
        height: '60%',
      }
    },
    '@keyframes scaleY100': {
      '0%': {
        height: '0%',
      },
      '100%': {
        height: '100%',
      }
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      }
    },
  })
);

export default style;
