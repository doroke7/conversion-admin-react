import React from 'react';

import CONFIGS from '@/CONFIGS/INDEX';

import noneSrc from '@/images/none.png';
import './Index.scss';

const STORAGE = CONFIGS.STORAGE;

interface IProps {}

class None extends React.Component<IProps> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {}

  public componentDidUpdate() {}

  public render() {
    let sSrc = window.location.protocol + '//' + STORAGE.HOST + '/_/none.png';

    return (
      <div className="none p-2 position-relative bg-light">
        <div className="icon-wrapper position-absolute">
          <div className="icon d-flex justify-content-center align-middle overflow-hidden text-center">
            <img src={noneSrc} />
          </div>
          <div className="text text-center text-secondary text-truncate mt-2">超级聊天室服务平台</div>
        </div>
      </div>
    );
  }
}

export default None;
