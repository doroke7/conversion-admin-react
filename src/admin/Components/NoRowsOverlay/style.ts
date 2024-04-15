import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
      flexDirection: 'column',
      backgroundColor: 'rgba(250, 250, 250, 0)'
    },
    icon: {
      width: oTheme.spacing(24),
      height: oTheme.spacing(24)
    },
    text: {
      color: grey[400],
      fontSize: oTheme.spacing(4),
      fontWeight: 900
    }
  })
);

export default oStyle;
