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
      transform: 'rotate(-25deg)',
      animation: '$wave 6s infinite ease-in-out alternate-reverse'
    },
    '@keyframes wave': {
      '0%': {
        transform: 'rotate(-6deg)'
      },
      '100%': {
        transform: 'rotate(+5deg)'
      }
    }
  })
);

export default oStyle;
