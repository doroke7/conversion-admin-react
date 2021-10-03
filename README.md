

# 后台前端服务文档

### (壹) 架构图


### TODO
1. import { Link, withRouter, useLocation } from 'react-router-dom';
   withRouter 改用 useLocation 写法


####  (贰)【后台前端项目】运行与更新相关

````txt
【首次更新】
sudo git pull;
yarn;
yarn run build;
````

````txt
【更新】
sudo git pull;
yarn run build;
````

####  (叁)代码规范
````txt
业务代码只用 export default , 太弹性的 导出 容易代码混乱
````

####  (拾) 其他
````txt
代码改变 路由 path 需要手动清除 storage.tabs (太麻烦，可以加上版本号)

强烈禁止使用 Table Component 改用 Data Grid Component
````