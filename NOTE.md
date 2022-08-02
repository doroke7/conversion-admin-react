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


## 权限表结构
1. mac_administrator 
   id, name, password
2. mac_role
   id, name, description

3. administrator_to_role
   administrator_id, role_id
   一个角色下面可以多个管理号
   一个管理号下面可以多个角色

4. mac_menu
   id, name, description, path, parent_id, icon

5. mac_authorization_menu (设计一个权限页面 分成两部分，上面是菜单，下面是接口功能， 再用tab 区分 app_id)
   app_id, role_id, menu_id
   某一个分包 ， 一个角色 有多个 菜单
   某一个分包 ， 一个菜单 有多个 角色

6. mac_authorization_route
   app_id, role_id, route_id

7. route
   path, value, name
         GET,POST,PUT,DELETE