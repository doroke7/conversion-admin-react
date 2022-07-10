import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, purple, blue } from '@material-ui/core/colors';

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
      marginLeft: oTheme.spacing(25),
      width: `calc(100% - ${oTheme.spacing(25)}px)`,
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
      padding: oTheme.spacing(2)
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
      height: oTheme.spacing(5),
      color: grey[50],
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
    avatar: {
      position: 'absolute',
      right: oTheme.spacing(2),
      cursor: 'pointer'
    }
  })
);

export default style;
