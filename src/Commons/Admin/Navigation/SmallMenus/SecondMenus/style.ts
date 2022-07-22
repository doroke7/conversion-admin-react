import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      color: grey[100]
    },
    papper: {
      color: grey[100],
      background: 'linear-gradient(195deg, #125489 30%, #048bab 90%)',
      boxShadow: '0 8px 25px 4px rgb(33 203 243 / 60%)'
    }
  })
);

export default oStyle;
