import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, blue } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginLeft: oTheme.spacing(0)
    },
    toolTip: {
      cursor: 'pointer'
    },
    iconButton: {
      position: 'relative',
      color: grey[100],
      minWidth: oTheme.spacing(5),
      minHeight: oTheme.spacing(5),
      marginRight: oTheme.spacing(0),
      borderRadius: '50%',
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
      }
    },
    icon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)',
      minWidth: oTheme.spacing(3),
      minHeight: oTheme.spacing(3)
    }
  })
);

export default style;
