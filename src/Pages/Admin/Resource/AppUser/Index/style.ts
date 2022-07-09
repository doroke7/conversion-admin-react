import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
      marginTop: oTheme.spacing(10)
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
      marginTop: oTheme.spacing(2)
    },
    avatar: {
      margin: 'auto',
      backgroundColor: pink[500],
      width: oTheme.spacing(8),
      height: oTheme.spacing(4)
    },
    button: {
      marginTop: oTheme.spacing(8),
      fontSize: oTheme.spacing(8)
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
