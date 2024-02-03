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
  green,
  yellow
} from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {},
    alert: {
      color: oTheme.palette.background.paper
    },
    debugAlert: {
      // 1，前端-未知的错误，
      backgroundColor: grey[700]
    },

    infoAlert: {
      // 0, 前端资讯讯息，后端-资讯讯息
      backgroundColor: green[500]
    },
    noticeAlert: {
      // -1，前端-警告，注意错误
      backgroundColor: green[500]
    },
    warnAlert: {
      // -2, 后端-警告错误
      backgroundColor: orange[500]
    },
    errorAlert: {
      // -3：后端-程序错误
      backgroundColor: red[500]
    },

    fatalAlert: {
      // -4：后端-系统错误
      backgroundColor: pink[300]
    },

    alertTitle: { fontWeight: 900 },
    message: { fontWeight: 100 }
  })
);

export default oStyle;
