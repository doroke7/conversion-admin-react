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
      background: 'linear-gradient(195deg, ' + grey[900] + ' 30%, ' + grey[800] + ' 90%)',
      boxShadow: '2px 2px 2px 0px rgb(45 45 45 / 50%)'
    }
  })
);

export default oStyle;
