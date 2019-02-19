# TuBlog

> 💥 A blog platform built with koa2.5, vue2.5 and react16.4

## 特性
- 支持以标签、类型进行分类及热门文章推荐
- 支持文章与读书、项目之间的关联
- 支持分配访客id，可以进行访问统计，发送提醒消息
- 强大的留言板，支持楼层间回复等功能

## 所需依赖数据库
- mongodb 存储文章、留言、访客记录等数据
- redis 存储访客id，浏览统计

## Project setup
```
   yarn run init
```

### Compiles and hot-reloads for development
```
   yarn run dev-client
   yarn run dev-admin
   yarn run dev-server
```

### Compiles and minifies for production
```
   yarn run build
```


### Run your unit tests
```
   yarn run test
```

### JSON-Server
```
    npm install -g json-server
    json-server --watch ./client/faker/*.json --port 3000
```
