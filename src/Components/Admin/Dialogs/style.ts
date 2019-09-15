import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    errorIcon: {
      verticalAlign: 'middle',
    },
    title: {
      verticalAlign: 'middle',
      marginLeft: '0.5rem',
    }
  }),
);

export default style;
