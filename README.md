

# 后台前端服务文档

### (壹) 架构图


### TODO
1. import { Link, withRouter, useLocation } from 'react-router-dom';
   withRouter 改用 useLocation 写法


### NOTE
1. 复数 组合 <div> 时候， 自定义 Compoenent 里面 请不要 一个作为一个基础原件， 请把 多个组为 一种， 代码比较简单 

2. typeof iNumber === 'undefined' ， 使用 typeof 为字串


3. 网页路由上 使用 ?query={urlencode}&option={urlencode} 或 ?query={AESencode}&option={AESencode}

4. 路由规则，（为最终菜单，可能为2，3级菜单）  /admin/resource/{数据表名}/index
5. 路由规则，（为一级菜单）  /admin/{名称1}/index
6. 路由规则，（为二级菜单）  /admin/{名称1}/{名称2}/index



#  目录结构
##  一级目录结构
```files
.
├── dist...            前端服务 API 文档放的地方，由 JS 组成。
├── node_modules...    前端 三方 NPM 组件库，请忽略
├── public...          Nginx 服务器 指向的 root 处，里面有 404
├── src...             项目代码主要处
├── types...           型别档案


```

##  二级目录结构
```files
.
├── src                      
│   ├── actions          Redux-action 定义处
│   ├── Commons          基本公共组件, 如 Header, Footer
│   ├── Components       一般公共组件
│   ├── CONFIGS          共用设定配置
│   ├── Contexts         共用Context组件, 能处理复杂的共用数据, 可以接受嵌套 Context.Provider 语法
│   ├── entries          Webpack 打包入口
│   ├── events           跨组件事件, 能处理简单的共用数据
│   ├── Helpers          类别形式的公用程序库
│   ├── HOCs             目前无用
│   ├── images           jpg, png, gif 资源处
│   ├── Pages            页面组件
│   ├── reducers         Redux-reducer 定义处
│   ├── source           mp3, mp4 资源
│   ├── store            Redux-store 定义处, 能处理API来的共用数据
│   ├── styles           基本样式
│   └── utilities        函数型的自定义函式库

```
---------------------------------------

##  三级目录结构
```files
.
├── src                      
│   ├── actions                     Redux-action 定义处(包含 前台,后台,使用)
│   │   ├── admin                   控制器(后台使用的 API)
│   │   ├── service                 控制器(前台使用的 API)


```
---------------------------------------


##  函数式 Compoent 内部的方法 使用 变量形式
```files
function Component() {
   let cMethod = () => {};

}


```
---------------------------------------

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

需要请运维在 API Nginx 加上以下 表头
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, PATCH, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Version,Ver,Keys,Time,Signature' always;    # allowed header from REQUEST
    add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Version,Ver,Keys,Time,Signature' always;   # allowed header from RESPONSE


````
