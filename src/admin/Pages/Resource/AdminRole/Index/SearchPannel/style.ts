import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: oTheme.spacing(1),
      marginBottom: oTheme.spacing(3),
      justifyContent: 'space-between',
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  })
);

export default oStyle;
