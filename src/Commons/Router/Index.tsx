import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import {
  Chatroom,
  Login,
  User,
} from '@/Pages/';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Chatroom} />
      <Route path="/chatroom" component={Chatroom} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={User} />
    </BrowserRouter>
  );
}

export default Router;