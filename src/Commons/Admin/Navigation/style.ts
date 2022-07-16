import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, deepOrange, deepPurple } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },

    hide: {
      display: 'none'
    },
    drawer: {
      width: oTheme.spacing(25),
      flexShrink: 0,
      whiteSpace: 'nowrap',
      background: 'linear-gradient(195deg, #125489 30%, #048bab 90%)',
      boxShadow: '0 8px 25px 4px rgb(33 203 243 / 60%)'
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
      color: grey[100],
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: oTheme.spacing(0),
      paddingRight: oTheme.spacing(2),
      paddingBottom: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(2) + 4,

      minHeight: oTheme.spacing(7)
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
    }
  })
);

export default style;
