import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: 'rgb(239, 239, 239)',
      height: '100vh'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

export default style;
