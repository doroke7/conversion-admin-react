import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const style = makeStyles((theme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
      margin: 10,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {},
  }),
);

export default style;
