import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  lightBlue,
  blue,
  blueGrey,
  grey,
  deepPurple,
  indigo,
  pink,
  red,
  orange,
  green
} from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {},
    alert: {
      color: oTheme.palette.background.paper
    },
    successAlert: {
      // 2，后端-正确讯息
      backgroundColor: green[500]
    },
    infoAlert: {
      // 1, 前端资讯讯息，后端-资讯讯息
      backgroundColor: blue[500]
    },
    warningAlert: {
      // -1，前端-警告，后端警告
      backgroundColor: orange[500]
    },
    errorAlert: {
      // -2, 后端-业务级别的错误
      backgroundColor: pink[300]
    },
    criticalAlert: {
      // -3, 后端-系统错误
      backgroundColor: red[500]
    },
    unknownAlert: {
      // -9999，前端-未知的错误，
      backgroundColor: grey[700]
    },
    alertTitle: { fontWeight: 900 },
    message: { fontWeight: 100 }
  })
);

export default oStyle;
