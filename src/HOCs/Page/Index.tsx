import React, { useState } from 'react';

interface IProps {
  history: any;
  location: any;
}

let Page = (PageComponent: any) =>
  class extends React.Component<IProps> {
    public constructor(...oProps: any) {
      super(oProps);
      this.onFocus = this.onFocus.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    get displayName() {
      return 'Page';
    }

    public onFocus() {
      this.checkAuthentication();
    }

    public onMouseMove() {
      this.checkAuthentication();
    }

    public checkAuthentication() {}

    public componentWillMount() {
      this.checkAuthentication();
    }

    public componentDidMount() {}
    public render() {
      return <PageComponent history={this.props.history} />;
    }
  };

export default Page;
