import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    wrapperTabs: {
      marginTop: theme.spacing(1),
    },
    tab: {
      padding: theme.spacing(1),
      backgroundColor: grey[200],
      borderTop: '1px solid #dddddd',
      borderLeft: '1px solid #dddddd',
      borderRight: '1px solid #dddddd',
      borderBottom: 'none',
      borderRadius: '0.5rem 0.5rem 0 0',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    tabEnable: {
      padding: theme.spacing(1),
      borderTop: '1px solid #dddddd',
      borderLeft: '1px solid #dddddd',
      borderRight: '1px solid #dddddd',
      borderRadius: '0.5rem 0.5rem 0 0',
      cursor: 'pointer',
      textDecoration: 'none',
      backgroundColor: '#ffffff'
    },
    icon:{
      verticalAlign: 'middle',
      marginRight: theme.spacing(1)
    },
    text: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(1)

    },
    clear: {
      verticalAlign: 'middle',
      fontWeight: 100,
    }

  }),
);

export default style;
