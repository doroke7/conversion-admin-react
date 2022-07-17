import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      maxHeight: 'calc( 100% - ' + oTheme.spacing(6) + 'px )',
      minHeight: 'calc( 100% - ' + oTheme.spacing(6) + 'px )',
      width: '100%',
      animation: '$in 0.3s ease-in-out 0s 1 alternate'
    },
    '@keyframes in': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    }
  })
);

export default oStyle;
