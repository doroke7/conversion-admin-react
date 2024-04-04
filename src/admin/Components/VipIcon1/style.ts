import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(2),
      height: oTheme.spacing(2),
      verticalAlign: 'middle',
      overflow: 'hidden'
    }
  })
);

export default oStyle;
