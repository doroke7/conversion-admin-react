import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, purple, blue } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    appBar: {
      background: '#125489',
      boxShadow: '0px 0px 15px 0px rgb(33 203 243 / 60%)',
      zIndex: oTheme.zIndex.drawer + 1,
      transition: oTheme.transitions.create(['width', 'margin'], {
        easing: oTheme.transitions.easing.sharp,
        duration: oTheme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: oTheme.spacing(25),
      width: `calc(100% - ${oTheme.spacing(25)}px)`,
      transition: oTheme.transitions.create(['width', 'margin'], {
        easing: oTheme.transitions.easing.sharp,
        duration: oTheme.transitions.duration.enteringScreen
      })
    },
    icon: {
      filter:
        'drop-shadow( 1px 1px 0px rgba(0, 0, 0, 0.8)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4))'
    },
    toolbar: {
      minHeight: oTheme.spacing(7),
      paddingLeft: oTheme.spacing(1.5),
      paddingRight: oTheme.spacing(1.5)
    },
    iconButton: {
      marginRight: oTheme.spacing(1.5),
      padding: oTheme.spacing(2)
    },
    typography: {
      paddingLeft: oTheme.spacing(2),
      [oTheme.breakpoints.down('sm')]: {
        fontSize: oTheme.spacing(1.5)
      }
    },
    formControl: {
      margin: 0,
      minWidth: 100,
      position: 'absolute',
      right: oTheme.spacing(9),
      '& .MuiSvgIcon-root': {
        color: 'white'
      }
    },
    select: {
      height: oTheme.spacing(5),
      color: oTheme.palette.background.paper,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)'
        }
      }
    },
    menuItem: {},
    hide: {
      display: 'none'
    },
    right: {
      position: 'absolute',
      right: oTheme.spacing(2)
    },
    avatarWrapper: {
      cursor: 'pointer'
    },
    badge: {
      '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${oTheme.palette.background.paper}`,
        '&::after': {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: '$ripple 1s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""'
        }
      }
    },

    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  })
);

export default style;
