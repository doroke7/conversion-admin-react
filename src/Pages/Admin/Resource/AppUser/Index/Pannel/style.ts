import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginBottom: oTheme.spacing(4)
    },
    id: {
      width: oTheme.spacing(16),
      marginRight: oTheme.spacing(2)
    },
    username: {
      width: oTheme.spacing(16),
      marginRight: oTheme.spacing(2)
    }
  })
);

export default oStyle;
