import Axios from './Axios/Index';
import Aes from './Aes/Index';
import Authentication from './Authentication/Index';
import Socket from './Socket/Index';
import Emitter from './Emitter/Index';
import Tab from './Tab/Index';

export {
  Axios as AxiosHelper,
  Authentication as AuthenticationHelper,
  Socket as SocketHelper,
  Emitter as EmitterHelper,
  Tab as TabHelper,
  Aes as AesHelper
};

export default {
  Axios,
  Authentication,
  Socket,
  Emitter,
  Tab,
  Aes
};
