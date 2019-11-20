# 个人仿京东移动端

### 使用方式 

\* 通过静态页面引入一个index.js



\* 通过自动构建 import 导入



### 初始化方法

```html
  <!-- 指定网页的内容编码格式 utf-8 -->
    <meta charset="UTF-8">
    <!-- 视口设置：
    width=device-width 让当前的可视区域的宽度等于设备的逻辑像素宽
    initial-scale=1.0 初始化的缩放比例为1  不缩放
    user-scalable=no 禁止用户缩放
    viewport-fit=cover 针对移动苹果手机前刘海问题

    -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no,viewport-fit=cover">
    <!-- 专门针对IE 8 进行的优化  IE：edge 在IE8下 会以IE的最高浏览器edge模式进行渲染 -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- 设置当前网页进行缓存  缓存的最大时间 为180s -->
    <meta http-equiv="Cache-Control" content="max-age=180">
    <!-- 设置苹果手机的菜单栏不显示 -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- 设置苹果手机的状态栏样式为黑色  -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!-- 苹果设备上 一些连续数字 会被自动识别为手机号 点击可以拨打  所以禁用掉 -->
    <meta name="format-detection" content="telephone=no">
    <!-- dns预获取 可以把当前页面的域名对应的ip进行解析之后缓存起来
    下一次用户点击连接反复加载的时候 不会再进行解析了 加快访问速度 -->
    <link rel="dns-prefetch" href="//m.360buyimg.com">
    <title>kiss-me的京东项目</title>
    <link rel="stylesheet" href="css/index.css">
    <!-- 引入网站图标 jpeg png .ico -->
    <link rel="shortcut icon" type="images/x-icon" href="favicon.ico">
```



### 个人风格

* rem + flex布局
* 开放接口

### 

