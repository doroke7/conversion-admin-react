import React from 'react';
import './Index.scss';
interface IProps {
  onClick: any;
  className: any;
  style?: any;
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
      <div className={"scroll-button position-absolute " + this.props.className} onClick={this.onClick} style={this.props.style}>
        <div className="iconfont icon-down down"></div>
      </div>
    );
  }
}

export default ScrollButton;