import React from 'react';
import './Index.scss';
interface IProps {
  onClick: any;
  className: any;
}

class ScrollButton extends React.Component<IProps> {
  public constructor(...oProps: any) {
    super(oProps);
    this.onClick = this.onClick.bind(this);
  }

  public onClick() {
    this.props.onClick();
  }

  public render() {
    return (
      <div className={"scroll-button position-absolute " + this.props.className} onClick={this.onClick}>
        <div className="iconfont icon-down down"></div>
      </div>
    );
  }
}

export default ScrollButton;