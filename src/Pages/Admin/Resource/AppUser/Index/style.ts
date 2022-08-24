import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    dataGridWrapper: {
      width: '100%',
      height: '578px',
      '& .MuiDataGrid-root': {
        '& .MuiDataGrid-overlay': {
          background: grey[50]
        }
      }
    },
    dataGrid: {
      borderBottom: '0px solid #fff'
    },
    paginationWrapper: {
      marginTop: oTheme.spacing(1)
    },
    avatar: {
      background: grey[100],
      border: '1px ' + grey[300] + ' solid'
    },
    vipIcon: {}
  })
);

export default style;
