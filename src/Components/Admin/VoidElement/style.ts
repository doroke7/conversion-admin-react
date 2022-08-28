import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(3),
      height: oTheme.spacing(3),
      verticalAlign: 'middle',
      fill: 'currentColor',
      overflow: 'hidden'
    }
  })
);

export default oStyle;
