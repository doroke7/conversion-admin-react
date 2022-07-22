import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      color: grey[100]
    },
    papper: {
      color: grey[100],
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 0px 8px 3px rgb(33 203 243 / 30%), 0 0px 8px 3px rgb(33 203 243 / 30%)',
      borderColor: 'rgba(0, 0, 0, 0.23)'
    }
  })
);

export default oStyle;
