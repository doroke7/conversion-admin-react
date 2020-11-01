import Axios from './Axios/Index';
import Authentication from './Authentication/Index';
import Socket from './Socket/Index';
import Emitter from './Emitter/Index';
import Tab from './Tab/Index';

export {
  Axios as AxiosHelper,
  Authentication as AuthenticationHelper,
  Socket as SocketHelper,
  Emitter as EmitterHelper,
  Tab as TabHelper
};

export default {
  Axios,
  Authentication,
  Socket,
  Emitter,
  Tab
};
