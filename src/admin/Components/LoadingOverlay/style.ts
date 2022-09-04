import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'column'
    },
    icon: {
      width: oTheme.spacing(10),
      height: oTheme.spacing(10)
    }
  })
);

export default oStyle;
