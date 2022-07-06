import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
      paddingBottom: '5rem',
      paddingTop: '3rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      borderRadius: '15px',
      boxShadow: 'rgb(100 116 139 / 34%) 0px 10px 22px',
      backgroundColor: 'rgb(255, 255, 255)'
    },
    lockIcon: {
      fontSize: '2rem'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {},
    title: {
      textAlign: 'center',
      marginTop: '1rem',
      marginBottom: '4rem'
    },
    avatar: {
      margin: 'auto',
      backgroundColor: pink[500],
      width: '4rem',
      height: '4rem',
      marginBottom: '2rem'
    },
    button: {
      marginTop: '1rem',
      fontSize: '1rem'
    },
    forgetPasswordAndSignup: {
      marginTop: '0.5rem',
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
      fontSize: '0.75rem',
      float: 'left'
    },
    version: {
      marginLeft: '0.5rem',
      color: grey[500],
      fontWeight: 300,
      fontSize: '0.75rem',
      float: 'right'
    }
  })
);

export default style;
