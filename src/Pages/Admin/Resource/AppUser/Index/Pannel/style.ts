import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginTop: oTheme.spacing(1),
      marginBottom: oTheme.spacing(3)
    },
    id: {
      width: oTheme.spacing(16),
      marginRight: oTheme.spacing(2)
    },
    username: {
      width: oTheme.spacing(16),
      marginRight: oTheme.spacing(2)
    },
    formControl: {
      '& fieldset': {
        '& > legend': {
          maxWidth: oTheme.spacing(250)
        }
      },

      marginRight: oTheme.spacing(2)
    },
    formControlPhoneType: {
      '& fieldset': {
        '& > legend': {
          width: oTheme.spacing(6)
        }
      }
    },
    formControlVip: {
      '& fieldset': {
        '& > legend': {
          width: oTheme.spacing(8)
        }
      }
    },
    selectCode: {
      width: oTheme.spacing(30)
    },
    selectEmpty: {
      color: grey[400]
    },
    startDate: {
      marginRight: oTheme.spacing(2),
      '& .MuiFormLabel-filled': {
        '& + .MuiInputBase-root': {
          color: 'rgba(0, 0, 0, 0.87)'
        }
      },
      '& .MuiInputBase-root': {
        color: grey[400]
      }
    },
    endDate: {
      marginRight: oTheme.spacing(2),
      '& .MuiFormLabel-filled': {
        '& + .MuiInputBase-root': {
          color: 'rgba(0, 0, 0, 0.87)'
        }
      },
      '& .MuiInputBase-root': {
        color: grey[400] // 时间选择器：未选择时候是暗灰色
      }
    },
    selectPhoneType: {
      width: oTheme.spacing(20)
    },
    selectVip: {
      width: oTheme.spacing(20)
    },
    icon: {
      maxWidth: oTheme.spacing(2),
      maxHeight: oTheme.spacing(2)
    }
  })
);

export default oStyle;
