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
    root: {
      width: '100%',
      maxWidth: oTheme.spacing(40),
      color: grey[100],
      zIndex: -1
    },
    title: {
      marginLeft: oTheme.spacing(2),
      fontWeight: 900,
      color: '#ffffff',
      userSelect: 'none',
      textShadow:
        '1px 1px 2px #4dd0e1, -1px -1px 2px #4dd0e1, -1px 1px 2px #4dd0e1, 1px -1px 2px #4dd0e1, 1px 0px 2px #4dd0e1, 0px 1px 2px #4dd0e1, -1px 0px 2px #4dd0e1, 0px -1px 2px #4dd0e1'
    },
    hidden: {
      display: 'none'
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: grey[100]
    },
    listItem: {
      height: oTheme.spacing(8)
    },
    icon: {
      filter:
        'drop-shadow( 1px 1px 0px rgba(0, 0, 0, 0.8)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4))'
    },
    backgroundColor01: { backgroundColor: red[500] },
    backgroundColor02: { backgroundColor: pink[500] },
    backgroundColor03: { backgroundColor: purple[500] },
    backgroundColor04: { backgroundColor: deepPurple[500] },
    backgroundColor05: { backgroundColor: indigo[500] },
    backgroundColor06: { backgroundColor: blue[500] },
    backgroundColor07: { backgroundColor: lightBlue[500] },
    backgroundColor08: { backgroundColor: cyan[500] },
    backgroundColor09: { backgroundColor: teal[500] },
    backgroundColor10: { backgroundColor: green[500] },
    backgroundColor11: { backgroundColor: lightGreen[500] },
    backgroundColor12: { backgroundColor: lime[500] },
    backgroundColor13: { backgroundColor: deepOrange[500] },
    backgroundColor14: { backgroundColor: brown[500] },
    backgroundColor15: { backgroundColor: blueGrey[500] }
  })
);

export default oStyle;
