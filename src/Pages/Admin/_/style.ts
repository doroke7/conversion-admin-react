import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let style = makeStyles((theme: Theme): any =>
  createStyles({
    iconWrapper: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    icon: {
      color: blueGrey[200],
      fontSize: '5rem',
      MaxWidth: '20rem',
      MaxHeight: '20rem',
      width: '20rem',
      height: '20rem'
    },
    text: {
      textAlign: 'center',
      color: blueGrey[200]
    }
  })
);

export default style;

// csq
