import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: '$ripple 3.4s ease-in-out 0s infinite alternate'
    },
    text: {
      textAlign: 'center',
      fontWeight: 900,
      color: grey[500],
      fontSize: oTheme.spacing(4)
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
  })
);

export default oStyle;

// csq
