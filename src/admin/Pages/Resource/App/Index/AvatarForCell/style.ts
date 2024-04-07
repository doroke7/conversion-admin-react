import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {},
    avatar: {
      background: grey[50],
      border: '1px ' + grey[600] + ' solid'
    },
    vipIcon: {
      transform: ' rotate(45deg)',
      filter: 'drop-shadow( 0px 2px 2px rgba(0, 0, 0, .7))'
    }
  })
);

export default oStyle;
