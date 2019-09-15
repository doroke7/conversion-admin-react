import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme): any => 
  createStyles({
    paper: {
      padding: theme.spacing(1),
      borderRadius: '6px',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

export default style;
