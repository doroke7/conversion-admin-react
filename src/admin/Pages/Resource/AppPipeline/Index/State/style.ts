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
      position: 'relative',
      width: '7px',
      height: '20px',
      background: grey[200],
    },
    process: {
      width: '7px',
      position: 'absolute',
      left: oTheme.spacing(0),
      bottom: oTheme.spacing(0),
      background: grey[200],

    },
    processFail: {
      boxSizing: 'border-box',
      height: '100%',
      background: pink[50],
      border: '2px dotted ' + red[200],

    },
    processNone: {
      height: '0%',
      background: 'transparent'
    },
    processOnging: {
      boxSizing: 'border-box',
      height: '100%',
      background: lightBlue[50],
      border: '2px dotted ' + lightBlue[500],

    },
    processSuccess: {
      height: '100%',
      background: lightBlue[700],
    },

    processAnimation01: {
      animation: '$scaleY100 0.3s ease-out 0.0s 1 normal, $scaleY000 0s linear 0.0s 1 normal',
    },
    processAnimation02: {
      animation: '$scaleY100 0.3s ease-out 0.05s 1 normal, $scaleY000 0.05s linear 0.0s 1 normal',
    },
    processAnimation03: {
      animation: '$scaleY100 0.3s ease-out 0.10s 1 normal, $scaleY000 0.10s linear 0.0s 1 normal',
    },
    processAnimation04: {
      animation: '$scaleY100 0.3s ease-out 0.15s 1 normal, $scaleY000 0.15s linear 0.0s 1 normal',
    },
    processAnimation05: {
      animation: '$scaleY100 0.3s ease-out 0.20s 1 normal, $scaleY000 0.20s linear 0.0s 1 normal',
    },
    processAnimation06: {
      animation: '$scaleY100 0.3s ease-out 0.25s 1 normal, $scaleY000 0.25s linear 0.0s 1 normal',
    },
    '@keyframes scaleY60': {
      '0%': {
        height: '0%',
      },
      '70%': {
        height: '80%',
      },
      '80%': {
        height: '60%',
      },
      '90%': {
        height: '70%',
      },
      '100%': {
        height: '60%',
      }
    },
    '@keyframes scaleY000': {
      '0%': {
        height: '0%',
      },
      '100%': {
        height: '0%',
      }
    },
    '@keyframes scaleY100': {
      '0%': {
        height: '0%',
      },

      // '70%': {
      //   height: '140%',
      // },
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
