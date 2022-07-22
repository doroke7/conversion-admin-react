import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

let oStyle = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    }
  })
);

export default oStyle;
