import React from 'react';

import {
  STORAGE
} from '@/CONFIGS';

import './Index.scss';

interface IProps {
}

class None extends React.Component<IProps> {
  public constructor(props: any) {
    super(props);


  }



  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + '/_/room-icon.png';

    return (
      <div className="none p-2 position-relative bg-light">
        <div className="icon-wrapper position-absolute">
          <div className="icon d-flex justify-content-center align-middle overflow-hidden text-center">
            <img src={sSrc} />
          </div>
          <div className="text-center text-secondary mt-2">
            超级聊天室平台服务
          </div>
        </div>
      </div>
    );
  }
}

export default None;
