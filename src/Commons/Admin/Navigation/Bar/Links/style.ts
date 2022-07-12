import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    listItemIcon: {
      color: grey[100]
    }
  })
);

export default style;
