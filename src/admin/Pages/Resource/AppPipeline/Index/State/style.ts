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
      background: grey[200],
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
      height: '100%',
      background: pink[50],
      border: '2px dotted ' + red[200],
      animation: '$fadeIn 0.3s linear 0s 1 normal'

    },
    processNone: {
      height: '0%',

    },
    processOnging: {
      boxSizing: 'border-box',
      height: '100%',
      background: lightBlue[50],
      border: '2px dotted ' + lightBlue[500],
      animation: '$scaleY60 0.3s ease-in 0s 1 normal'

    },
    processSuccess: {
      height: '100%',
      '&:nth-child(1)': {
        animation: '$scaleY100 0.3s ease-in 0.05s 1 normal',

      },
      '&:nth-child(2)': {
        animation: '$scaleY100 0.3s ease-in 0.10s 1 normal',

      },
      '&:nth-child(3)': {
        animation: '$scaleY100 0.3s ease-in 0.15s 1 normal',

      },
      '&:nth-child(4)': {
        animation: '$scaleY100 0.3s ease-in 0.20s 1 normal',

      },
      '&:nth-child(5)': {
        animation: '$scaleY100 0.3s ease-in 0.25s 1 normal',

      },
      '&:nth-child(6)': {
        animation: '$scaleY100 0.3s ease-in 0.30s 1 normal',

      }



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
    '@keyframes scaleY100': {
      '0%': {
        height: '0%',
      },
      '50%': {
        height: '120%',
      },
      '60%': {
        height: '100%',
      },
      '70%': {
        height: '120%',
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
