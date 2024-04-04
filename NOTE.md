## 目录结构改变
1. React, Vue 这种强烈组合式思维的模型，
   不适合 【先区分模块再区分子项目】
   反倒合适 【先区分子项目再区分模块】 的架构


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


## 修改  Admin API 
1. code 系统错误改成 -3
2. code 密码错误改成 -2
3. code 长度够不够改成 -1


## 初始REACT项目
a. yarn create react-app frontend-react
b. npx create-react-app frontend-react

## react-scripts
1. v^5.0.0 以上版本 react script 直接内嵌 webpack

