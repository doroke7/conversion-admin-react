import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  deepOrange,
  brown,
  grey,
  blueGrey
} from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      zIndex: 10000,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, ' + grey[200] + ' 20%, ' + grey[50] + ' 50%, ' + grey[200] + ' 80%)',
    },
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      animation: '$zoomIn 1.5s ease-in-out 0s 1 normal, $fadeIn 2.4s ease-out 0s 1 normal'
    },
    progressError: {
      background: 'transparent'
    },
    serverErrorIcon: {
      width: oTheme.spacing(125),
      height: oTheme.spacing(75),
    },
    title: {
      fontSize: oTheme.spacing(7),
      fontWeight: 500,
      color: grey[900]
    },
    description: {
      marginTop: oTheme.spacing(2),
      color: lightBlue[700],
      fontSize: oTheme.spacing(2.3),

    },
    '@keyframes zoomIn': {
      '0%': {
        transform: 'translate(-50%, -50%) scale(0)',
      },
      '60%': {
        transform: 'translate(-50%, -50%) scale(1.2)',
      },
      '100%': {
        transform: 'translate(-50%, -50%) scale(1)',
      }
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      }
    }
  })
);

export default style;
