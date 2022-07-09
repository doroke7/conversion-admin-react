import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    errorIcon: {
      verticalAlign: 'middle'
    },
    title: {
      verticalAlign: 'middle',
      marginLeft: oTheme.spacing(1) - 4
    }
  })
);

export default style;
