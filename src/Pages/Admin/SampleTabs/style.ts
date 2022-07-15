import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    tab: {
      position: 'relative'
    },
    iconButton: {
      position: 'absolute',
      right: oTheme.spacing(1),
      top: '50%',
      transform: 'translate(-50%, 0%)',
      opacity: 0,
      '&:hover': {
        opacity: 1
      }
    }
  })
);

export default oStyle;

// csq
