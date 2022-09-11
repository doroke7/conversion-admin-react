import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginBottom: oTheme.spacing(2)
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
