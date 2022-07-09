import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let style = makeStyles((oTheme: Theme): any =>
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
      fontSize: oTheme.spacing(10),
      MaxWidth: oTheme.spacing(20),
      MaxHeight: oTheme.spacing(20),
      width: oTheme.spacing(20),
      height: oTheme.spacing(20)
    },
    text: {
      textAlign: 'center',
      color: blueGrey[200],
      userSelect: 'none'
    }
  })
);

export default style;

// csq
