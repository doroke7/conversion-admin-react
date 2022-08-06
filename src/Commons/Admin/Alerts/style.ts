import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  lightBlue,
  blue,
  blueGrey,
  grey,
  deepPurple,
  indigo,
  pink,
  red,
  orange,
  green
} from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {},
    success: {
      // 2
      color: oTheme.palette.background.paper,
      backgroundColor: green[500]
    },
    info: {
      // 1
      color: oTheme.palette.background.paper,

      backgroundColor: blue[500]
    },
    warning: {
      // -1
      color: oTheme.palette.background.paper,

      backgroundColor: orange[500]
    },
    error: {
      // -2
      color: oTheme.palette.background.paper,

      backgroundColor: pink[300]
    },
    critical: {
      // -3
      color: oTheme.palette.background.paper,

      backgroundColor: red[500]
    },
    alertTitle: { fontWeight: 900 },
    message: { fontWeight: 100 }
  })
);

export default oStyle;
