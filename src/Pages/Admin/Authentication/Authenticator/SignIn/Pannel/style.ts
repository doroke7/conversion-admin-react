import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
      paddingBottom: oTheme.spacing(10),
      paddingTop: oTheme.spacing(6),
      paddingLeft: oTheme.spacing(4),
      paddingRight: oTheme.spacing(4),
      borderRadius: oTheme.spacing(2),
      boxShadow: 'rgb(100 116 139 / 34%) 0px 10px 22px',
      backgroundColor: 'rgb(255, 255, 255)',
      animation: '$fade 0.7s linear 0s 1 normal, $slide 0.5s ease-out 0.2s 1 normal'
    },
    '@keyframes fade': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    '@keyframes slide': {
      '0%': {
        transform: 'translateY(-60%)'
      },
      '100%': {
        transform: 'translateY(0%)'
      }
    },
    lockIcon: {
      fontSize: oTheme.spacing(4)
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
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
