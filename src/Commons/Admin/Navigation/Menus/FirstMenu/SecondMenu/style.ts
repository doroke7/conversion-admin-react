import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    listText: {
      color: grey[200],
      marginLeft: oTheme.spacing(1) + 4
    },
    listItemIcon: {
      color: grey[600],
      minWidth: oTheme.spacing(3)
    },
    listItem: {
      paddingTop: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(2) + 2,
      paddingRight: oTheme.spacing(1) + 0,
      paddingBottom: oTheme.spacing(0),
      '&:hover': {
        background: grey[800]
      },
      cursor: 'pointer',
      background: grey[0]
    },
    arrowRightIcon: {
      color: grey[400] + ' !important'
    }
  })
);

export default oStyle;
