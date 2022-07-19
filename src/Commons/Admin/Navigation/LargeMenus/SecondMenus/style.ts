import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: oTheme.spacing(4)
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: grey[100]
    }
  })
);

export default oStyle;
