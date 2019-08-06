import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    pannel: {
      width: '100%',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {},
  }),
);

export default useStyles;
