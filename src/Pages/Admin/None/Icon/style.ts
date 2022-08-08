import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(90),
      height: oTheme.spacing(90),
      verticalAlign: 'middle',
      fill: 'currentColor',
      overflow: 'hidden',
      transformOrigin: '50% 100%',
      transform: 'rotate(0deg)',
      animation:
        '$zoom 1s ease-in-out 0s 1 alternate, $wave1 3s ease-in-out 1s 1 alternate, $wave2 6s ease-in-out 4s infinite alternate'
    },
    '@keyframes zoom': {
      '0%': {
        transform: 'scale(0)'
      },

      '100%': {
        transform: 'scale(1)'
      }
    },
    '@keyframes wave1': {
      '0%': {
        transform: 'rotate(0deg)'
      },

      '100%': {
        transform: 'rotate(-6deg)'
      }
    },
    '@keyframes wave2': {
      '0%': {
        transform: 'rotate(-6deg)'
      },

      '100%': {
        transform: 'rotate(5deg)'
      }
    }
  })
);

export default oStyle;
