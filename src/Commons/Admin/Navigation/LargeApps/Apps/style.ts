import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  deepOrange,
  brown,
  grey,
  blueGrey
} from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    backgroundColor1: { backgroundColor: red[500] },
    backgroundColor2: { backgroundColor: pink[500] },
    backgroundColor3: { backgroundColor: purple[500] },
    backgroundColor4: { backgroundColor: deepPurple[500] },
    backgroundColor5: { backgroundColor: indigo[500] },
    backgroundColor6: { backgroundColor: blue[500] },
    backgroundColor7: { backgroundColor: lightBlue[500] },
    backgroundColor8: { backgroundColor: cyan[500] },
    backgroundColor9: { backgroundColor: teal[500] },
    backgroundColor10: { backgroundColor: green[500] },
    backgroundColor11: { backgroundColor: lightGreen[500] },
    backgroundColor12: { backgroundColor: lime[500] },
    backgroundColor13: { backgroundColor: deepOrange[500] },
    backgroundColor14: { backgroundColor: brown[500] },
    backgroundColor15: { backgroundColor: blueGrey[500] },

    root: {
      margin: oTheme.spacing(1) + 'px' + ' ' + oTheme.spacing(2) + 'px',
      padding: oTheme.spacing(2) + 'px' + ' ' + oTheme.spacing(0) + 'px',
      borderRadius: oTheme.spacing(0.5),
      animation: '$brighten 0.4s 1 ease-in-out',
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    listItem: {
      paddingLeft: oTheme.spacing(2)
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: oTheme.palette.background.paper,
    },
  })
);

export default oStyle;
