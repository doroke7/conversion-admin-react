import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, lightBlue, blue, red, common } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      width: '160px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    wrapperProcess: {
      width: '7px',
      height: '20px',
      background: lightBlue[50],
      position: 'relative',
    },
    process: {
      width: '7px',
      background: lightBlue[700],
      position: 'absolute',
      left: oTheme.spacing(0),
      bottom: oTheme.spacing(0),
    },
    processFail: {
      boxSizing: 'border-box',
      height: '20px',
      background: pink[50],
      border: '2px dotted ' + red[200],
      animation: '$fadeIn .3s linear 0s 1 normal'

    },
    processNone: {
      height: '0%',

    },
    processOnging: {
      height: '60%',
      animation: '$scaleY60 .3s linear 0s 1 normal'

    },
    processSuccess: {
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
