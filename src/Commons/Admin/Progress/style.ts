import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  lightBlue,
  blue,
  blueGrey,
  grey,
  deepPurple,
  indigo,
  pink,
  red,
  orange,
  green
} from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 1000
    }
  })
);

export default oStyle;
