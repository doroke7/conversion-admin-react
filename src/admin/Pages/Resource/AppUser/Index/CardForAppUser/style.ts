import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginBottom: oTheme.spacing(2),
      width: 'calc( 100% / 3 - ' + oTheme.spacing(2 / 3) + 'px)',
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% / 3 - ' + oTheme.spacing(2 / 3) + 'px)'
      },
      [oTheme.breakpoints.down('xs')]: {
        width: 'calc( 100% / 1 - ' + oTheme.spacing(0 / 1) + 'px)'
      }
    },
    avatar: {
      backgroundColor: red[500]
    },
    cardMedia: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    badgeIcon: {
      width: oTheme.spacing(4),
      height: oTheme.spacing(4)
    }
  })
);

export default oStyle;
