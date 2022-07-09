import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey， deepOrange, deepPurple } from '@material-ui/core/colors';

const drawerWidth = 200;

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },

    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      background: 'linear-gradient(195deg, #125489 30%, #048bab 90%)',
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxShadow: '0 8px 25px 4px rgb(33 203 243 / 60%)'
    },
    drawerPaper: {
      background: 'linear-gradient(195deg, #125489 30%, #048bab 90%)'
    },
    drawerOpen: {
      width: drawerWidth,
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
      width: oTheme.spacing(7) + 1,
      [oTheme.breakpoints.up('sm')]: {
        width: oTheme.spacing(5) + 5 // 一个 8px
      }
    },
    toolbar: {
      ...oTheme.mixins.toolbar,
      display: 'flex',
      color: grey[100],
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0px 16px 0px 20px',
      minHeight: '44px'
    },
    appName: {
      fontWeight: 900,
      fontSize: oTheme.spacing(2),
      color: '#FFFFFF',
      userSelect: 'none',
      textShadow: '1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000, 1px 1px 1px #000000'
    },
    [oTheme.breakpoints.up('sm')]: {
      toolbar: {
        minHeight: oTheme.spacing(5) + 5
      }
    },
    iconButton: {
      color: grey[200],
      padding: oTheme.spacing(0)
    },
    content: {
      flexGrow: 1
      // padding: oTheme.spacing(3),
    },
    subContent: {
      minHeight: 'calc(100vh - 70px)',
      // padding: oTheme.spacing(2),
      position: 'relative'
    },

    paper: {
      padding: oTheme.spacing(2),
      borderRadius: '6px',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      marginTop: '0.25rem'
    }
  })
);

export default style;
