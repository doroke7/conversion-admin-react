import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    listItem: {
      paddingLeft: oTheme.spacing(4)
    },
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      color: grey[100]
    }
  })
);

export default oStyle;
