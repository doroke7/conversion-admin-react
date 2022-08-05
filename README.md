

# 后台前端服务文档

### (壹) 架构图


## TODO
1. import { Link, useLocation } from 'react-router-dom';
   改用 useLocation 写法


## NOTE
1. 复数 组合 <div> 时候， 自定义 Compoenent 里面 请不要 一个作为一个基础原件， 请把 多个组为 一种， 代码比较简单 

2. typeof iNumber === 'undefined' ， 使用 typeof 为字串


3. 网页路由上 使用 ?query={urlencode}&option={urlencode} 或 ?query={AESencode}&option={AESencode}

4. 路由规则，（为最终菜单，可能为2，3级菜单）  /admin/resource/{数据表名}/index
5. 路由规则，（为一级菜单）  /admin/{名称1}/index
6. 路由规则，（为二级菜单）  /admin/{名称1}/{名称2}/index

## JS function 的问题
   避免函数跟 函数组件 混肴所以，函数 统一使用 let 宣告变量函数
   避免函数跟 函数组件 混肴所以，函数组件 统一使用 function 宣告组件


#  目录结构
##  一级目录结构
```files
.
├── dist...            前端服务 API 文档放的地方，由 JS 组成。
├── etc                放在 Linux 主机需要的配置
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
│   ├── Commons          全局公共组件（在每个页面都会用到的组件）, 如 Header, Footer
│   ├── Components       一般公共组件（自定义的最小可用组件）
│   ├── CONFIGS          共用设定配置
│   ├── Contexts         共用Context组件, 能处理复杂的共用数据, 可以接受嵌套 Context.Provider 语法
│   ├── entries          Webpack 打包入口
│   ├── events           跨组件事件, 能处理简单的共用数据
│   ├── Helpers          类别形式的公用程序库
│   ├── Wrappers         高阶组件，替代 Mixin
│   ├── images           jpg, png, gif 资源处
│   ├── Pages            页面组件
│   ├── reducers         Redux-reducer 定义处
│   ├── router           路由配置定义处, 因为 router 太重要所以不放在 CONFIG 中
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
│   │   │   
│   ├── Commons                     共用组件
│   │   ├── admin                   控制器(后台使用的 API)
│   │   ├── service                 控制器(前台使用的 API)


```
---------------------------------------


##  四级 以及五级以上的目录结构
```files
.
├── src                      
│   ├── actions                                Redux-action 定义处(包含 前台,后台,使用)
│   │   ├── admin                              
│   │   │   ├───                               
│   │   │     
│   │   ├── service                            
│   │   │   ├───                              
│   │   │ 
│   │   │   
│   ├── Commons                                共用组件
│   │   ├── Admin                              后台-共用组件
│   │   │   ├── Navigation                     导览组件 (包含菜单组件，分页组件，快链接组件)
│   │   │   │   ├── AlertOfApps                警告，在没有选择app 情况下点击 link 或 menu                
│   │   │   │   ├── Bar                        上方的超链接       
│   │   │   │   ├── LargeApps                  一般模式的 应用程序选择             
│   │   │   │   ├── SmallApps                  简易模式的 应用程序选择 
│   │   │   │   ├── LargeMenus                 一般模式的 菜单组件              
│   │   │   │   ├── SmallMenus                 简易模式的 菜单组件              
│   │   │   │   ├── Tabs                       分页组件 。把 page 丢入 Nav 的 children 中， 最后再由 tabs 解析        
                             
│   │   │  
│   │   ├── Service                           


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
