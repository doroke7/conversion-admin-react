import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const style = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: grey[800],

      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    toolbar: {
      minHeight: '45px',
      paddingLeft: '12px',
      paddingRight: '12px'
    },
    menuButton: {
      marginRight: 0
    },
    hide: {
      display: 'none'
    },
    avatar: {
      position: 'absolute',
      right: '1rem',
      cursor: 'pointer'
    }
  })
);

export default style;
