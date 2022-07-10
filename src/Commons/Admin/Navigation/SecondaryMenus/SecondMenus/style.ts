import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: oTheme.spacing(4)
    },
    listItemIcon: {
      minWidth: '32px',
      color: grey[100]
    }
  })
);

export default oStyle;
