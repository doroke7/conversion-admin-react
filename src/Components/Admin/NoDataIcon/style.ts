import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(4),
      height: oTheme.spacing(4),
      '& .ant-empty-img-1': {
        fill: oTheme.palette.type === 'light' ? '#aeb8c2' : '#262626'
      },
      '& .ant-empty-img-2': {
        fill: oTheme.palette.type === 'light' ? '#f5f5f7' : '#595959'
      },
      '& .ant-empty-img-3': {
        fill: oTheme.palette.type === 'light' ? '#dce0e6' : '#434343'
      },
      '& .ant-empty-img-4': {
        fill: oTheme.palette.type === 'light' ? '#fff' : '#1c1c1c'
      },
      '& .ant-empty-img-5': {
        fillOpacity: oTheme.palette.type === 'light' ? '0.8' : '0.08',
        fill: oTheme.palette.type === 'light' ? '#f5f5f5' : '#fff'
      }
    }
  })
);

export default oStyle;
