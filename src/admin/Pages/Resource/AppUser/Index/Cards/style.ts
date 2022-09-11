import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit',
        maxWidth: 'calc( 100% - ' + oTheme.spacing(7) + 'px )'
      }
    },
    loadingIcon: {
      width: oTheme.spacing(8),
      height: oTheme.spacing(8),
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)'
    }
  })
);

export default oStyle;
