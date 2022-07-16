import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: '$ripple 0.3s 1 ease-in-out'
    },
    text: {
      textAlign: 'center',
      fontWeight: 900,
      color: grey[500],
      fontSize: oTheme.spacing(4)
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'translate(-50%, -50%) scale(.8)',
        opacity: 0
      },
      '100%': {
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1
      }
    }
  })
);

export default oStyle;

// csq
