import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';

import style from './style';

interface IState {
  name: string;
  password: string;
}

function Pannel(): any {
  const classes: any = style(void 0);

  const [values, setValues] = React.useState<IState>({
    name: '',
    password: '',
  });

  const handleChange = (sKey: keyof IState) => (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [sKey]: oEvent.target.value });
  };

  return (
    <div className={classes.pannel}>
      <Avatar className={classes.avatar}>
        <PageviewIcon />
      </Avatar>
      <TextField
        id="user-name"
        label="名称"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        fullWidth
        variant="outlined"
      />
      <TextField
        id="user-password"
        label="密码"
        className={classes.textField}
        value={values.password}
        onChange={handleChange('password')}
        margin="normal"
        fullWidth
        variant="outlined"
      />
    </div>
  );
}
export default Pannel;
