import React from 'react';
import Divider from 'antd/es/divider';

import './Index.scss';

interface IProps {
}

class Top extends React.Component<IProps> {
  public constructor(...props: any) {
    super(props);
  }



  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    return (
      <div className="mt-3 mb-2">
          <p>头像</p>
          <Divider/>
          <p>昵称</p>
          <Divider/>
          <p>等级</p>
          <Divider/>
          <p>我的关注</p>
          <Divider/>
          <p>我的赞</p>
          <Divider/>
          <p>我的等级</p>
          <Divider/>
          <p>显示我的投注</p>
          <Divider/>
          <p>蔽所有投注</p>
          <Divider/>
      </div>
    );
  }
}

export default Top;
