import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey } from '@material-ui/core/colors';

let style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      position: 'relative',
      background: 'linear-gradient(to bottom, ' + grey[200] + ' 10%, ' + grey[50] + ' 50%, ' + grey[200] + ' 90%)',

    },
    icon: {
      width: oTheme.spacing(24),
      height: oTheme.spacing(24),
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)'
    }
  })
);

export default style;

// csq
