
## 安装基本应用程序

```
1. 安装 cenotos 版本 (一定需要 linux 环境，由于 作业系统版本适配很差)
2. 安装 node v16.16.0  版本 (一定需要 固定主版本为 16版本，不可其他，由于 node-sass 对于 node 版本， 作业系统版本适配很差)
3. 安装 yarn v1.22.11  版本
```

## 其他

1. 复数 组合 <div> 时候， 自定义 Compoenent 里面 请不要 一个作为一个基础原件， 请把 多个组为 一种， 代码比较简单 

2. typeof iNumber === 'undefined' ， 使用 typeof 为字串


3. 网页路由上 使用 /app-id/:appId/page/:page/limit/:limit?a=1&b=2
   其中 :appId, :page, :limit 对应到 后端 API 的 option of HTTP params 参数
   其中 a, b 对应到 后端 API 的 param of HTTP Body 参数


4. 路由规则，（为最终菜单，可能为2，3级菜单）  /admin/resource/{数据表名}/index
5. 路由规则，（为一级菜单）  /admin/{名称1}/index
6. 路由规则，（为二级菜单）  /admin/{名称1}/{名称2}/index
```

## JS function 的问题
``` 
   避免函数跟 函数组件 混肴所以，函数 统一使用 let 宣告变量函数
   避免函数跟 函数组件 混肴所以，函数组件 统一使用 function 宣告组件
```
## 常用的业务组件
```
1. 全域公共组件: 全局公共组件（在每个页面都会用到的组件）, 如 Header, Footer
2. 私有单元组件：一般单元组件（自定义的最小可用组件）
3. 特殊高阶组件：REACT 高阶组件 "函数"，用于取代 Mixin 结构
4. 基本页面组件：页面组件，依照路由设定匹配的页面组件
5. 部分区块组件：在一个组件里面的子组件，为了有效的解耦代码，分散代码，一个代码档案尽量各任其职，一个 ts 尽量不要超过300 行， 一个function 尽量不要超过 100 行，不要有一个档案 巨大到不可控的地步
6. 数据 Context 组件：用来全局(或半全局)共享数据的组件
7. <App> SPA 全局组件：定义整个 React 包的SPA组件
```

---------------------------------------

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
│   ├── admin                后台前端项目使用目录
│   └── service              前台前端项目使用目录
│      
│     
   

```

##  三级目录结构
```files
.
├── src     
│   └── admin            
│       ├── actions          Redux-action 定义处
│       ├── Commons          全局公共组件（在每个页面都会用到的组件）, 如 Header, Footer
│       ├── Components       一般单元组件（自定义的最小可用组件）
│       ├── CONFIGS          共用设定配置
│       ├── Contexts         共用Context组件, 能处理复杂的共用数据, 可以接受嵌套 Context.Provider 语法
│       ├── entries          Webpack 打包入口
│       ├── events           跨组件事件, 能处理简单的共用数据
│       ├── Exception        项目自定义的 例外 结构, 弥补 JavaScript Error 缺少 code 变数
│       ├── Helpers          类别形式的公用程序库
│       ├── images           jpg, png, gif 资源处
│       ├── Pages            页面组件，依照路由设定匹配的页面组件
│       ├── reducers         Redux-reducer 定义处
│       ├── Sdks             Sdk 定义处，呼叫外面API的地方
│       ├── router           路由配置定义处, 因为 router 太重要所以不放在 CONFIG 中, 而是独立出来
│       ├── source           mp3, mp4 资源
│       ├── store            Redux-store 定义处, 能处理API来的共用数据
│       ├── styles           基本样式
│       ├── utilities        函数型的自定义函式库
│       └── wrappers         REACT 高阶组件 "函数"，用于取代 Mixin 结构

```


##  四级 以及四级以上的目录结构
```files
.
├── src     
│   └── admin            
│       └── Commons                            全局公共组件（在每个页面都会用到的组件）, 如 Header, Footer
│           └── Navigation                     导览组件 (包含菜单组件，分页组件，快链接组件)
│               ├── AlertOfApps                警告，在没有选择app 情况下点击 link 或 menu                
│               ├── Bar                        上方的超链接       
│               ├── LargeApps                  一般模式的 应用程序选择             
│               ├── SmallApps                  简易模式的 应用程序选择 
│               ├── LargeMenus                 一般模式的 菜单组件 。 Menu 的 Icon 由 Menu 自己控制             
│               ├── SmallMenus                 简易模式的 菜单组件 。 Menu 的 Icon 由 Menu 自己控制                   
│               └── Tabs                       分页组件 。 Tab 的 Icon 由 Router 配置控制          



```
---------------------------------------
##  类别使用大驼峰
```files
Helpers.Admin.Rsa.**;


##  函数式组件使用大驼峰
```files
function Component() {
   let cMethod = () => {};

}


##  一般函数使用变量形式
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



## 修改 VS-Code 左边导览文件夹的预设缩进大小
   File > Preferences > Settings > Workbench > Appearance > Tree： Indent 24

## 覆写 Material UI 的方案
(a) React 提供属性 className, 继承覆盖此 Element 的 类别来覆写 样式
(b) React Material-UI 提供属性 classes, 可以继承覆盖该元素以及子元素的 类别来覆盖样式
(c) 使用 Material-UI 的 root 以及 makeStyle 里面  类似 scss 的 '& Muixxx-yyyy' 覆写样式 

## 不要使用 react-router-config
 1. 类似 vue 配置式路由写法
 2. 其实只是用 map 很简单的微调
 3. 兼容性差， 已经停止维护 ，尤其对 react-router-dom@6 以上版本不兼容

## 不使用 withStyles 这种函数建立 Element, 改用 makeStyles
1. 弹性较高

## REACT 使用内建 children 属性 表示 子元素，这是 react 内建，不需要另外引入
  const { children, classes, onClose, ...other } = props;