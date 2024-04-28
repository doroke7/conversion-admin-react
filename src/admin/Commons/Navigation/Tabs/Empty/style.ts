import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: '$ripple 3.4s ease-in-out 0.9s infinite alternate, $zoomOut 0.3s ease-out 0.6s 1 normal, $zoomIn 0.6s ease-in-out 0s 1 normal, $fadeIn 0.6s ease-in-out 0s 1 normal'
    },
    text: {
      textAlign: 'center',
      fontWeight: 900,
      color: grey[500],
      fontSize: oTheme.spacing(2),
      [oTheme.breakpoints.up('sm')]: {
        fontSize: oTheme.spacing(4)
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'translate(-50%, -50%) scale(1.00)',
        opacity: 1
      },
      '100%': {
        transform: 'translate(-50%, -50%) scale(1.05)',
        opacity: 1
      }
    },
    '@keyframes zoomIn': {
      '0%': {
        transform: 'translate(-50%, -50%) scale(0)',
      },
      '100%': {
        transform: 'translate(-50%, -50%) scale(1.2)',
      }
    },
    '@keyframes zoomOut': {
      '0%': {
        transform: 'translate(-50%, -50%) scale(1.2)',
      },
      // '12.5%': {
      //   transform: 'translate(-50%, -50%) scale(1)',
      // },
      // '25.0%': {
      //   transform: 'translate(-50%, -50%) scale(1.12)',
      // },
      // '37.5%': {
      //   transform: 'translate(-50%, -50%) scale(1.14)',
      // },
      // '50.0%': {
      //   transform: 'translate(-50%, -50%) scale(1.16)',
      // },
      // '62.5%': {
      //   transform: 'translate(-50%, -50%) scale(1.18)',
      // },
      // '75.0%': {
      //   transform: 'translate(-50%, -50%) scale(1.2)',
      // },
      // '75.0%': {
      //   transform: 'translate(-50%, -50%) scale(1.2)',
      // },
      '100.0%': {
        transform: 'translate(-50%, -50%) scale(1)',
      },
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: '0',
      },
      '80%': {
        opacity: '0.3',
      },
      '100%': {
        opacity: '1',
      }
    }
  })
);

export default oStyle;

