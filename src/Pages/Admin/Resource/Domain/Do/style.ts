import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      borderRadius: '6px',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'
    },
    dataGridWrapper: {
      width: '100%',
      minHeight: '550px'
    }
  })
);

export default style;
