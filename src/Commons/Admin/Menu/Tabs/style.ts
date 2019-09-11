import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    tab: {
      padding: theme.spacing(1),
      borderTop: '1px solid #dddddd',
      borderLeft: '1px solid #dddddd',
      borderRight: '1px solid #dddddd',
      borderBottom: '1px solid #dddddd',
      borderRadius: '0.5rem 0.5rem 0 0'
    },
    tabEnable: {
      padding: theme.spacing(1),
      borderTop: '1px solid #dddddd',
      borderLeft: '1px solid #dddddd',
      borderRight: '1px solid #dddddd',
      borderRadius: '0.5rem 0.5rem 0 0'

    },
    icon:{
      verticalAlign: 'middle',
      marginRight: theme.spacing(1)
    },
    text:{
      verticalAlign: 'middle',
      marginRight: theme.spacing(1)

    }

  }),
);

export default style;
