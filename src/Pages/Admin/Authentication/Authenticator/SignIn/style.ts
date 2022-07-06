import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: 'rgb(250, 249, 249)',
      height: '100vh',
      position: 'relative'
    },
    middle: {
      width: '100%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0%, -50%)'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

export default style;
