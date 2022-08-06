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
    root: {
      '& .MuiAlert-filledSuccess': {
        // 2
        backgroundColor: green[500]
      },
      '& .MuiAlert-filledInfo': {
        // 1
        backgroundColor: blue[500]
      },
      '& .MuiAlert-filledWarning': {
        // -1
        backgroundColor: orange[500]
      },
      '& .MuiAlert-filledError': {
        // -2
        backgroundColor: pink[300]
      },
      '& .MuiAlert-filledCritical': {
        // -3
        backgroundColor: red[500]
      }
    },
    alertTitle: { fontWeight: 900 },
    message: { fontWeight: 100 }
  })
);

export default oStyle;
