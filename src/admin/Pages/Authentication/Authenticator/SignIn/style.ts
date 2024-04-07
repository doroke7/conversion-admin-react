import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: grey[50],
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
    middle: {
      width: '100%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0%, -50%)'
    },
    paper: {
      padding: oTheme.spacing(1),
      textAlign: 'center',
      color: oTheme.palette.text.secondary
    }
  })
);

export default style;
