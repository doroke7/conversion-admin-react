import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(90),
      height: oTheme.spacing(90),
      verticalAlign: 'middle',
      fill: 'currentColor',
      overflow: 'hidden'
    }
  })
);

export default oStyle;

// csq
