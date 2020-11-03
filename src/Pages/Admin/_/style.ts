import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

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
      color: grey[400],
      fontSize: '5rem',
      MaxWidth: '20rem',
      MaxHeight: '20rem',
      width: '20rem',
      height: '20rem'
    },
    text: {
      textAlign: 'center',
      color: grey[500]
    }
  })
);

export default style;

// csq
