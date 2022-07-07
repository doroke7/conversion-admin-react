import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let oStyle = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(4)
    }
  })
);

export default oStyle;

// csq
