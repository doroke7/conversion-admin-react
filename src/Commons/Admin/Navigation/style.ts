import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const style = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },

    link: {
      color: grey[200],
      textDecoration: 'none'
    },
    listItemIcon: {
      color: grey[100],
      minWidth: theme.spacing(3)
    },
    listItemEnable: {
      background: grey[700] + ' !important'
      // grey[xxx] 数值越小 #yyy 越大，  颜色越亮
    },
    listItem: {
      paddingTop: theme.spacing(0),
      paddingLeft: theme.spacing(1) + 2,
      paddingBottom: theme.spacing(0),
      '&:hover': {
        background: grey[800]
      },
      background: grey[0]
    },
    listText: {
      marginLeft: theme.spacing(2)
    },
    description: {
      marginBottom: theme.spacing(2)
    },

    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      background: grey[900],
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerPaper: {
      background: grey[900]
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(5) + 5 // 一个 8px
      }
    },
    toolbar: {
      display: 'flex',
      color: grey[100],

      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    [theme.breakpoints.up('sm')]: {
      toolbar: {
        minHeight: theme.spacing(5) + 5
      }
    },
    iconButton: {
      color: grey[200],
      padding: theme.spacing(0)
    },
    content: {
      flexGrow: 1
      // padding: theme.spacing(3),
    },
    subContent: {
      minHeight: 'calc(100vh - 186px)',
      // padding: theme.spacing(2),
      position: 'relative'
    },

    paper: {
      padding: theme.spacing(2),
      borderRadius: '6px',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      marginTop: '0.25rem'
    }
  })
);

export default style;
