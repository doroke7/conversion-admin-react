import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let oStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  })
);

export default oStyle;

// csq
