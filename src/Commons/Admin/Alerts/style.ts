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
        backgroundColor: green[500] // 2
      },
      '& .MuiAlert-filledInfo': {
        backgroundColor: blue[500] // 1
      },
      '& .MuiAlert-filledWarning': {
        backgroundColor: orange[500]
      },
      '& .MuiAlert-filledError': {
        backgroundColor: pink[300]
      },
      '& .MuiAlert-filledCritical': {
        backgroundColor: red[500]
      }
    },
    alertTitle: { fontWeight: 900 },
    message: { fontWeight: 100 }
  })
);

export default oStyle;
