import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '0.5rem',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default style;
