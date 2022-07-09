import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    appBar: {
      background: '#125489',
      boxShadow: '0 0px 25px 0px rgb(33 203 243 / 60%)',
      zIndex: oTheme.zIndex.drawer + 1,
      transition: oTheme.transitions.create(['width', 'margin'], {
        easing: oTheme.transitions.easing.sharp,
        duration: oTheme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: oTheme.transitions.create(['width', 'margin'], {
        easing: oTheme.transitions.easing.sharp,
        duration: oTheme.transitions.duration.enteringScreen
      })
    },
    toolbar: {
      minHeight: oTheme.spacing(7),
      paddingLeft: oTheme.spacing(1) + 4,
      paddingRight: oTheme.spacing(1) + 4
    },
    iconButton: {
      marginRight: 0,
      padding: oTheme.spacing(1) + 2
    },
    typography: {
      paddingLeft: oTheme.spacing(2),
      [oTheme.breakpoints.down('sm')]: {
        fontSize: oTheme.spacing(1) + 4
      }
    },
    formControl: {
      margin: 0,
      minWidth: 100,
      position: 'absolute',
      right: oTheme.spacing(8),
      '& .MuiSvgIcon-root': {
        color: 'white'
      }
    },
    select: {
      // padding: '0px 12px 10px',
      color: grey[50]
    },
    menuItem: {},
    hide: {
      display: 'none'
    },
    avatar: {
      position: 'absolute',
      right: oTheme.spacing(2),
      cursor: 'pointer'
    }
  })
);

export default style;
