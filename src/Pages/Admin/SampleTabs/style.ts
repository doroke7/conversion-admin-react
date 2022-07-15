import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120
    },
    selectEmpty: {
      marginTop: oTheme.spacing(4)
    },
  
  })
);

export default oStyle;

// csq
