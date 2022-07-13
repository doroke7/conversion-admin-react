import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginLeft: oTheme.spacing(2)
    },
    listItemIcon: {
      color: grey[100],
      minWidth: oTheme.spacing(5)
    }
  })
);

export default style;
