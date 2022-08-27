import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginTop: oTheme.spacing(2),
      marginBottom: oTheme.spacing(4)
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
          width: oTheme.spacing(4)
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
    select: {
      width: oTheme.spacing(20)
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
    }
  })
);

export default oStyle;
