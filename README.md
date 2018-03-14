# phaChat 一个基于 node.js 的多人 web 聊天室
 - chat
 - node
 - express
 - socket
 
## Description 简介
一个简单的 web 聊天室, 采用 node.js 编写，基于 express + mysql + socket 实现的在线多人web 聊天系统，包括用户的登陆注册，用户的个
人信息修改,目的是为了更加深入学习了解 node.js 和 websocket 技术，给初学者一个练习的小项目。有兴趣的同学可以继续完善（用户的头像上传，创建聊天群，消息保存等）

## Install 安装

1. 环境准备

    - npm 3.*
    - node v6.*
    - express 4.3.*
    - mysql 5.5.*
    - redis 2.8.*

    **软件的安装请自行查找资料**

2. 创建数据库
    ```
    # 进入代码 document 目录, 执行下面命令（如果提示 mysql 找不到，请将 mysql 加入环境变量）
    mysql -u root -padmin -e "source phachat.sql"
    # root 为 mysql 账号，admin 为 mysql 密码
    ```

3. 修改配置文件

    打开 config/default.json, 修改 mysql 和 redis 的账号密码配置

4. 启动

    请保证 mysql, redis 是开启状态，进入代码根目录 phaChat
    ```
    npm install
    npm start //开启聊天室客户端
    node server //开启聊天室服务端
    ```

- 使用

  浏览器输入 http://127.0.0.1:3000/chat/index,
    
## 目录介绍
- config 配置文件信息
- core 一些公共的核心类
- document 文档目录 sql文件
- models 数据model类
- public 公共的静态文件(css, js, images)目录
- routes 路由
- views 模板文件
- app.js 客户端全局配置
- package.json node 模块包信息
- server.js socket 服务端

## 界面效果
![image](https://raw.githubusercontent.com/phachon/phaChat/master/public/images/chat.jpg)

## 扩展

- 创建聊天室
- 用户修改头像
- 发送表情
- model层优化

## 反馈

欢迎提交意见和代码，联系方式 phachon@163.com

## License

MIT

Thanks
---------
Create By phachon@163.com
