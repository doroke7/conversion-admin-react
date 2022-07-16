import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginLeft: oTheme.spacing(2)
    },
    toolTip: {
      cursor: 'pointer'
    },
    listItemIcon: {
      color: grey[100],
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(2)
    }
  })
);

export default style;
