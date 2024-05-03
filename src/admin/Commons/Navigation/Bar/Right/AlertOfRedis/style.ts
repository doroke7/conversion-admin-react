import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    iconButton: {
      position: 'absolute',
      right: oTheme.spacing(1.5),
      top: oTheme.spacing(1.5),
      height: oTheme.spacing(4.5),
      width: oTheme.spacing(4.5),
      color: grey[500],
      borderRadius: oTheme.spacing(0.75)
    },
    dialogActions: {
      // padding: oTheme.spacing(2.5)
    },
    confirmButton: {}
  })
);

export default oStyle;
