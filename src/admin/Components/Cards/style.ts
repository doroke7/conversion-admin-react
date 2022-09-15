import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        maxWidth: 'calc( 100% - ' + oTheme.spacing(7) + 'px )'
      }
    },
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)',
      textAlign: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    loadingIcon: {
      width: oTheme.spacing(8),
      height: oTheme.spacing(8)
    },
    inIcon: {
      width: oTheme.spacing(24),
      height: oTheme.spacing(24)
    },
    text: {
      color: grey[400],
      fontSize: oTheme.spacing(4),
      fontWeight: 900
    }
  })
);

export default oStyle;
