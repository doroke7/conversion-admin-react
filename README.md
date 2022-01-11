

# 后台前端服务文档

### (壹) 架构图


### TODO
1. import { Link, withRouter, useLocation } from 'react-router-dom';
   withRouter 改用 useLocation 写法


### NOTE
1. 复数 组合 <div> 时候， 自定义 Compoenent 里面 请不要 一个作为一个基础原件， 请把 多个组为 一种， 代码比较简单 

2. typeof iNumber === 'undefined' ， 使用 typeof 为字串


3. 网页路由上 使用 ?query={urlencode}&option={urlencode} 或 ?query={AESencode}&option={AESencode}

4. 路由规则，（为最终菜单，可能为2，3级菜单）  /admin/resource/{数据表名}
5. 路由规则，（为一级菜单）  /admin/{名称1}/index
6. 路由规则，（为二级菜单）  /admin/{名称1}/{名称2}/index




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