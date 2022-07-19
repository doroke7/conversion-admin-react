import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      background: grey[50],
      color: grey[900],
      margin: oTheme.spacing(1) + 'px' + ' ' + oTheme.spacing(2) + 'px',
      borderRadius: oTheme.spacing(1)
    },
    nested: {
      paddingLeft: oTheme.spacing(2)
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: grey[900]
    }
  })
);

export default oStyle;
