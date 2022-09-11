import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit',
        maxWidth: 'calc( 100% - ' + oTheme.spacing(7) + 'px )'
      }
    }
  })
);

export default oStyle;
