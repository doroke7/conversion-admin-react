import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'column'
    },
    icon: {
      width: oTheme.spacing(40),
      height: oTheme.spacing(40)
    },
    text: {
      color: grey[600]
    }
  })
);

export default oStyle;
