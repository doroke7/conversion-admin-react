import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
      marginTop: '5rem',
    },
    lockIcon: {
      fontSize: '2rem',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {},
    title: {
      textAlign: 'center',
      marginTop: '1rem',
    },
    avatar: {
      margin: 'auto',
      backgroundColor: pink[500],
      width: '4rem',
      height: '4rem',
    },
    button: {
      marginTop: '1rem',
    },
    forgetPasswordAndSignup: {
      marginTop: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
    },
    link: {},
    copyright: {
      color: grey[500],
      textAlign: 'center',
    },
  }),
);

export default style;
