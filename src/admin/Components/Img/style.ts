import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      maxHeight: '100%',
      maxWidth: '100%'
    }
  })
);

export default style;
