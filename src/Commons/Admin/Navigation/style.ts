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
      minWidth: '36px'
    },
    listItemEnable: {
      background: grey[800]
    },
    listItem: {
      paddingTop: '0em',
      paddingBottom: '0em',
      '&:hover': {
        background: grey[0]
      },
      background: grey[0]
    },
    title: {},
    description: {
      marginBottom: theme.spacing(2)
    },

    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
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
        width: theme.spacing(9) + 1
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
    ['@media (min-width: 600px)']: {
      toolbar: {
        minHeight: '45px'
      }
    },
    iconButton: {
      color: grey[200],
      padding: '0px'
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
    paper1: {
      background: grey[900]
    },
    paper2: {
      padding: theme.spacing(2),
      borderRadius: '6px',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      marginTop: '0.25rem'
    }
  })
);

export default style;
