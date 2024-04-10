import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import Hocs from '@/admin/Hocs';
import Sdks from '@/admin/Sdks/Index';
import events from '@/admin/events/index';
import Components from '@/admin/Components/Index';
import utilities from '@/admin/utilities/index';

import Inputs from './Inputs/Index';
import SearchPannel from './SearchPannel/Index';
import AvatarForCell from './AvatarForCell/Index';
import PhoneTypeIconForCell from './PhoneTypeIconForCell/Index';
import CardForAppUser from './CardForAppUser/Index';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();

  let cSetPageMax = oProps.setPageMax ?? (() => void 0);


  return <div>APP</div>;
}
export default Hocs.authenticator(Hocs.tab(Hocs.page(Hocs.title(Index))));
