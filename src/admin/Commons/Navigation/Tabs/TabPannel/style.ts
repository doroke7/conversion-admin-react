import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      height: 'calc( 100% - ' + oTheme.spacing(14) + 'px )',
      [oTheme.breakpoints.down('sm')]: {
        height: 'calc( 100% - ' + oTheme.spacing(0) + 'px )'
      },
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
    },
    box: {
      position: 'absolute',
      padding: oTheme.spacing(2),
      height: 'calc( 100% - ' + oTheme.spacing(2) * 2 + 'px )',
      width: 'calc( 100% - ' + oTheme.spacing(2) * 2 + 'px )',
      [oTheme.breakpoints.down('sm')]: {
        padding: oTheme.spacing(1)
      }
    }
  })
);

export default oStyle;
