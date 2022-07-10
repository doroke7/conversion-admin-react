import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      color: grey[100]
    },
    rootHidden: {
      display: 'none'
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: grey[100]
    },
    listItem: {
      height: oTheme.spacing(6)
    }
  })
);

export default oStyle;
