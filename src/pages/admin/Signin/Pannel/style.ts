import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
      marginTop: '8rem',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {},
    title: {
      textAlign: 'center',
    },
    avatar: {
      margin: 'auto',
      backgroundColor: pink[500],
      width: '4rem',
      height: '4rem',
    },
  }),
);

export default style;
