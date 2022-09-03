import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      position: 'relative'
    },
    icon: {
      width: oTheme.spacing(12),
      height: oTheme.spacing(12),
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)'
    }
  })
);

export default style;

// csq
