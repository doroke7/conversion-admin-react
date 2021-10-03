import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },

    link: {
      textDecoration: 'none'
    },
    listItemIconFirst: {
      color: grey[200],
      minWidth: oTheme.spacing(3)
    },
    listItemIconSecond: {
      color: grey[600],
      minWidth: oTheme.spacing(3)
    },
    listItemEnable: {
      background: grey[700] + ' !important'
      // grey[xxx] 数值越小 #yyy 越大，  颜色越亮
    },
    listItemFirst: {
      paddingTop: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(1) + 2,
      paddingRight: oTheme.spacing(1) + 0,
      paddingBottom: oTheme.spacing(0),
      '&:hover': {
        background: grey[800]
      },
      cursor: 'pointer',
      background: grey[0]
    },

    listItemSecond: {
      paddingTop: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(2) + 2,
      paddingRight: oTheme.spacing(1) + 0,
      paddingBottom: oTheme.spacing(0),
      '&:hover': {
        background: grey[800]
      },
      cursor: 'pointer',
      background: grey[0]
    },
    listText: {
      color: grey[200],
      marginLeft: oTheme.spacing(1) + 4
    },
    description: {
      marginBottom: oTheme.spacing(2)
    },
    expandMore: {
      color: grey[400] + ' !important'
    },
    expandLess: {
      color: grey[400] + ' !important'
    },
    arrowRightIcon: {
      color: grey[400] + ' !important'
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
      justifyContent: 'flex-end',
      padding: oTheme.spacing(0, 1),
      minHeight: '44px'
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
