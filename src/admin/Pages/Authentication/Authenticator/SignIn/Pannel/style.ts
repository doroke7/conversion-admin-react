import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    pannel: {
      paddingBottom: oTheme.spacing(10),
      paddingTop: oTheme.spacing(6),
      borderRadius: oTheme.spacing(2),
      paddingLeft: oTheme.spacing(4),
      paddingRight: oTheme.spacing(4),
      boxShadow: 'rgb(100 116 139 / 34%) 0px 10px 22px',
      backgroundColor: oTheme.palette.background.paper,
      animation:
        '$fadeIn 0.5s linear 0s 1 normal, $slideIn1 0.6s ease-in-out 0s 1 normal, $slideIn2 0.3s ease-in-out 0.6s 1 normal',
      [oTheme.breakpoints.down('xl')]: {
        paddingLeft: oTheme.spacing(4),
        paddingRight: oTheme.spacing(4)
      },
      [oTheme.breakpoints.down('lg')]: {
        paddingLeft: oTheme.spacing(8),
        paddingRight: oTheme.spacing(8)
      },
      [oTheme.breakpoints.down('md')]: {
        paddingLeft: oTheme.spacing(4),
        paddingRight: oTheme.spacing(4)
      },
      [oTheme.breakpoints.down('sm')]: {
        paddingLeft: oTheme.spacing(4),
        paddingRight: oTheme.spacing(4)
      },
      [oTheme.breakpoints.down('xs')]: {
        paddingLeft: oTheme.spacing(1),
        paddingRight: oTheme.spacing(1)
      }
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    '@keyframes slideIn1': {
      '0%': {
        transform: 'translateY(-100%)'
      },
      '100%': {
        transform: 'translateY(+60%)'
      }
    },
    '@keyframes slideIn2': {
      '0%': {
        transform: 'translateY(+60%)'
      },

      '100%': {
        transform: 'translateY(0%)'
      }
    },
    pannelAnimation: {
      animation:
        '$fadeOut 0.5s linear 0s 1 normal, $slideOut1 0.3s ease-in 0s 1 normal, $slideOut2 0.3s ease-in .3s 1 normal, $slideOut3 1s ease-in .6s infinite normal !important'
    },
    '@keyframes fadeOut': {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    },
    '@keyframes slideOut1': {
      '0%': {
        transform: 'translateY(0%)'
      },
      '100%': {
        transform: 'translateY(+100%)'
      }
    },
    '@keyframes slideOut2': {
      '0%': {
        transform: 'translateY(+100%)'
      },
      '100%': {
        transform: 'translateY(+200%)'
      }
    },
    '@keyframes slideOut3': {
      '0%': {
        transform: 'translateY(+200%)'
      },
      '100%': {
        transform: 'translateY(+200%)'
      }
    },
    lockIcon: {
      fontSize: oTheme.spacing(4)
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    autorenewIcon: {
      animation: '$rotation 0.8s linear 0s infinite normal'
    },
    '@keyframes rotation': {
      '0%': {
        transform: 'rotate(0deg)'
      },

      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    textField: {},
    title: {
      textAlign: 'center',
      marginTop: oTheme.spacing(2),
      marginBottom: oTheme.spacing(8)
    },
    avatar: {
      margin: 'auto',
      backgroundColor: pink[500],
      width: oTheme.spacing(8),
      height: oTheme.spacing(8),
      marginBottom: oTheme.spacing(4)
    },
    button: {
      marginTop: oTheme.spacing(2),
      fontSize: oTheme.spacing(2),
      height: oTheme.spacing(7)
    },
    forgetPasswordAndSignup: {
      marginTop: oTheme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between'
    },
    link: {},
    decriptionAndVersion: {
      '&:after': {
        display: 'block',
        clear: 'both',
        content: ''
      }
    },
    decription: {
      color: grey[500],
      fontWeight: 700,
      fontSize: oTheme.spacing(1) + 4,
      float: 'left'
    },
    version: {
      marginLeft: oTheme.spacing(1),
      color: grey[500],
      fontWeight: 300,
      fontSize: oTheme.spacing(1) + 4,
      float: 'right'
    }
  })
);

export default style;
