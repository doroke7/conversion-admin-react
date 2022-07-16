## 使用 Context Hook 的方法 一
  1. 在 src/Contexts/**/Index 建立一种 context
  2. 在需要的父层 引入 1 并使用 **.Provider 包起来
  3. 在深度子孙组件中 引入 1, 并使用 useContext 取值
  *. 推荐使用,  为函数式 React 思维


  ## 使用 Context 的方法 二
  1. 在 src/Contexts/**/Index 建立一种 context
  2. 在需要的父层 引入 1 并使用 **.Provider 包起来
  3. 在深度子孙组件中 引入 1, 并使用 **.Consumber 包起来
  *. 不推荐使用,  为类别式 React 思维
