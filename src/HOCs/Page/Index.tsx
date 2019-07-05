import React, { useState } from 'react';

import {
  Authentication as AuthenticationHelper,
} from '@/Helpers';
interface IProps {
  history: any;
  location: any;
}

let Page = (PageComponent: any) => class extends React.Component<IProps> {
  public constructor(...oProps: any) {
    super(oProps);
    this.onFocus = this.onFocus.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    window.onstorage = (oEvent: any) => {
      if ((null === oEvent.key || '' === oEvent.newValue || null === oEvent.newValue) && '/login' !== this.props.location.pathname) {
        this.props.history.push("/login");
        return;
      }
    };
  }

  public onFocus() {
    this.checkAuthentication();
  }

  public onMouseMove() {
    this.checkAuthentication();
  } 

  public checkAuthentication() {
    let sUserId = AuthenticationHelper.getUserId();
    if (!sUserId && '/login' !== this.props.location.pathname) {
      this.props.history.push("/login");
      return;
    }
  }

  public componentWillMount(){
    this.checkAuthentication();
  }

  public componentDidMount() {
  }
  public render() {
    return <PageComponent history={this.props.history} onFocus={this.onFocus} onMouseMove={this.onMouseMove}/>;
  }
};

export default Page;