import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: '32px',
      color: grey[100]
    },
    papper: {
      color: grey[100],
      background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))'
    }
  })
);

export default oStyle;
