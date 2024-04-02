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

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },

    none: {
      display: 'none'
    },
    drawer: {
      width: oTheme.spacing(25),
      flexShrink: 0,
      whiteSpace: 'nowrap',
      background: 'linear-gradient(195deg, #125489 30%, #048bab 90%)',
      boxShadow: '0 8px 25px 4px rgb(33 203 243 / 60%)'
      // animation: '$slideDown 0.5s ease-in 0s 1 normal'
    },
    '@keyframes slideDown': {
      '0%': {
        transform: 'translateY(-100%)'
      },
      '100%': {
        transform: 'translateY(0%)'
      }
    },
    drawerPaper: {
      background: 'linear-gradient(195deg, #125489 30%, #048bab 90%)'
    },
    drawerOpen: {
      width: oTheme.spacing(25),
      transition: oTheme.transitions.create('width', {
        easing: oTheme.transitions.easing.sharp,
        duration: oTheme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: oTheme.transitions.create('width', {
        easing: oTheme.transitions.easing.sharp,
        duration: oTheme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: oTheme.spacing(7),
      [oTheme.breakpoints.up('sm')]: {
        width: oTheme.spacing(7) // 一个 8px
      }
    },
    toolbar: {
      ...oTheme.mixins.toolbar,
      display: 'flex',
      position: 'fixed',
      top: oTheme.spacing(0),
      left: oTheme.spacing(0),
      color: grey[100],
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: oTheme.spacing(0),
      paddingRight: oTheme.spacing(2) + 6,
      paddingBottom: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(2) + 4,

      minHeight: oTheme.spacing(7),
      background: 'linear-gradient(195deg, #125489 5%, #125480 100%)',
    },
    toolbarOpen: {
      boxShadow: '0px 0px 15px 0px rgb(33 203 243 / 60%)',

    },
    toolbarClose: {

    },
    [oTheme.breakpoints.up('sm')]: {
      toolbar: {
        minHeight: oTheme.spacing(7)
      }
    },
    appName: {
      fontWeight: 900,
      fontSize: oTheme.spacing(2),
      color: '#FFFFFF',
      userSelect: 'none',
      textShadow:
        '1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000'
    },
    icon: {
      filter:
        'drop-shadow( 1px 1px 0px rgba(0, 0, 0, 0.8)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4))'
    },
    iconButton: {
      color: grey[200],
      padding: oTheme.spacing(0)
    },
    content: {
      flexGrow: 1
    },

    paper: {
      padding: oTheme.spacing(2),
      borderRadius: oTheme.spacing(1) - 2,
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      marginTop: oTheme.spacing(1) - 4
    },
    firstDivider: {
      marginTop: oTheme.spacing(7),
      zIndex: -1,
    },
    secondDivider: {
      zIndex: -1,

    },
    thirdDivider: {
      zIndex: -1,
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

export default style;
