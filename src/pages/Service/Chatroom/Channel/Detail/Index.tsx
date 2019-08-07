import React from 'react';

import './Index.scss';

class Detail extends React.Component {
  public render() {
    return (
      <div className="detail">
        <div className="info-wrapper">
          <div className="iconfont icon-info info text-center"></div>
          <div className="description text-center">聊天室基本信息</div>
        </div>
      </div>
    );
  }
}

export default Detail;
