# send-notify-robot
> 本项目是对接钉钉自定义小机器人，消息格式请[查阅文档](https://open.dingtalk.com/document/orgapp/custom-robot-access)

## 快速开始
```shell
npm i -D send-notify-robot
yarn add -D send-notify-robot
pnpm i -D send-notify-robot
```

## 使用
```ts
// const { RobotDing } = require('send-notify-robot')
// 通过script标签直接导入
import { RobotDing } from 'send-notify-robot'

const robotDing = new RobotDing("https://oapi.dingtalk.com/robot/send?access_token=XXX", "SECXXX")

// robotDing.send("类型", {/* 消息内容 */})

// 发送文本消息
sendDing(
    'text',
    {
        content: 'Hello, World!',
        isAtAll: true,
        atUserIds: ['user1', 'user2'],
        atMobiles: ['13800000000']
    }
)

// 发送链接消息
sendDing(
    'link',
    {
        title: 'Hello, World!',
        content: 'This is a link message.',
        messageUrl: 'https://www.example.com',
        picUrl: 'https://www.example.com/pic.jpg'
    }
)

// 发送 markdown 消息
sendDing(
    'markdown',
    {
        title: 'Hello, World!',
        content: 'This is a markdown message.',
        isAtAll: true,
        atUserIds: ['user1', 'user2'],
        atMobiles: ['13800000000']
    }
)

// 发送 actionCard 消息 - 整体跳转
sendDing(
    'actionCard',
    {
        title: 'Hello, World!',
        content: 'This is a actionCard message.',
        btnOrientation: 0,
        singleTitle: 'Single Button',
        singleURL: 'https://www.example.com'
    }
)
// 发送 actionCard 消息 - 独立跳转
sendDing(
    'actionCard',
    {
        title: 'Hello, World!',
        content: 'This is a actionCard message.',
        btnOrientation: 0,
        btns: [
            { title: 'Button 1', actionURL: 'https://www.example.com/button1' },
            { title: 'Button 2', actionURL: 'https://www.example.com/button2' }
        ]
    }
)

// 发送 feedCard 消息
sendDing(
    'feedCard',
    {
        links: [
            { title: 'Hello, World!', messageURL: 'https://www.example.com', picURL: 'https://www.example.com/pic.jpg' },
            { title: 'Hello, World!', messageURL: 'https://www.example.com', picURL: 'https://www.example.com/pic.jpg' }
        ]
    }
)
```

## 配置
### text类型
```json
{
    "msgtype":"text",
    "content":"我就是我, @XXX 是不一样的烟火",
    "isAtAll": false,
    "atMobiles":["180xxxxxx"],
    "atUserIds":["user1"]
}
```

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| msgtype | String | ✅ | 消息类型，此时固定为：text |
| content | String | ✅ | 消息内容 |
| isAtAll | Boolean | ❌ | 是否@所有人 |
| atMobiles | Array | ❌ | 被@人的手机号，content里添加@人的手机号 |
| atUserIds | Array | ❌ | 被@人的用户userid |

![alt text](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4099076061/p131215.png)


### link类型
```json
{
    "msgtype": "link", 
    "title": "时代的火车向前开", 
    "content": "这个即将发布的新版本，创始人xx称它为红树林。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是红树林", 
    "picUrl": "", 
    "messageUrl": "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
 }
```

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| msgtype | String | ✅ | 消息类型，此时固定为：link |
| title | String | ✅ | 消息标题 |
| content | String | ✅ | 消息内容。如果太长只会部分展示 |
| messageUrl | String | ✅ | 点击消息跳转的URL |
| picUrl | String | ❌ | 图片URL |

![alt text](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4099076061/p131227.png)

### markdown类型
```json
{
    "msgtype": "markdown",
    "title":"杭州天气",
    "content": "#### 杭州天气 @150XXXXXXXX \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n",
    "isAtAll": false,
    "atMobiles":["180xxxxxx"],
    "atUserIds":["user1"]
 }
 ```

 | 参数 | 类型 | 是否必填 | 说明 |
 | --- | --- | --- | --- |
 | msgtype | String | ✅ | 消息类型，此时固定为：markdown |
 | title | String | ✅ | 首屏会话透出的展示内容 |
 | content | String | ✅ | markdown格式的消息 |
 | isAtAll | Boolean | ❌ | 是否@所有人 |
 | atMobiles | Array | ❌ | 被@人的手机号，content里添加@人的手机号 |
 | atUserIds | Array | ❌ | 被@人的用户userid |

 ![alt text](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4099076061/p131216.png)

 #### 目前只支持markdown语法的子集，具体支持的元素如下
 ```markdown
 标题
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

引用
> A man who stands for nothing will fall for anything.

文字加粗、斜体
**bold**
*italic*

链接
[this is a link](http://name.com)

图片（建议不要超过20张）
![](http://name.com/pic.jpg)

无序列表
- item1
- item2

有序列表
1. item1
2. item2
```

### actionCard类型 - 整体跳转
```json
{
    "msgtype": "actionCard",
    "title": "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身", 
    "content": "![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png) 
### 乔布斯 20 年前想打造的苹果咖啡厅 
Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划", 
    "btnOrientation": "0", 
    "singleTitle" : "阅读全文",
    "singleURL" : "https://www.dingtalk.com/"
}
```

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| msgtype | String | ✅ | 消息类型，此时固定为：actionCard |
| title | String | ✅ | 首屏会话透出的展示内容 |
| content | String | ✅ | markdown格式的消息 |
| btnOrientation | String | ❌ | 按钮排列的排列方式，0为列布局，1为行布局 |
| singleTitle | String | ✅ | 单个按钮的标题，设置此项和singleURL后，会忽略所有按钮 |
| singleURL | String | ✅ | 点击singleTitle按钮触发的URL |

![alt text](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5099076061/p131217.png)

### actionCard类型 - 独立跳转
```json
{
    "msgtype": "actionCard",
    "title": "我 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身", 
    "content": "![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n\n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划", 
    "btnOrientation": "0", 
    "btns": [
        {
            "title": "内容不错", 
            "actionURL": "https://www.dingtalk.com/"
        }, 
        {
            "title": "不感兴趣", 
            "actionURL": "https://www.dingtalk.com/"
        }
    ]
}
```
| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| msgtype | String | ✅ | 消息类型，此时固定为：actionCard |
| title | String | ✅ | 首屏会话透出的展示内容 |
| content | String | ✅ | markdown格式的消息 |
| btnOrientation | String | ❌ | 按钮排列的排列方式，0为列布局，1为行布局 |
| btns | Array<Object> | ✅ | 按钮信息 |
| btns[].title | String | ✅ | 按钮标题 |
| btns[].actionURL | String | ✅ | 点击按钮触发的URL |
| btns[].singleTitle | String | ✅ | 单个按钮的标题，设置此项和singleURL后，会忽略所有按钮 |

![alt text](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5099076061/p131218.png)

### feedCard类型
```json
{
    "msgtype":"feedCard",
    "links": [
        {
            "title": "时代的火车向前开1", 
            "messageURL": "https://www.dingtalk.com/", 
            "picURL": "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
        },
        {
            "title": "时代的火车向前开2", 
            "messageURL": "https://www.dingtalk.com/", 
            "picURL": "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
        }
    ]
}
```

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| msgtype | String | ✅ | 消息类型，此时固定为：feedCard |
| links | Array<Object> | ✅ | 消息内容对象 |
| links[].title | String | ✅ | 单条信息文本 |
| links[].messageURL | String | ✅ | 点击单条信息到跳转链接 |
| links[].picURL | String | ✅ | 单条信息图片 |

![alt text](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5099076061/p131219.png)

## 错误码
| 错误码 | 错误信息 | 说明 |
| --- | --- | --- |
| 400013 | 群已被解散 | 请向其他群中发送消息 |
| 400101 | access_token不存在 | 请确认access_token拼写是否正确 |
| 400102 | 机器人已停用 | 请联系管理员启用机器人 |
| 400105 | 不支持的消息类型 | 请使用文档中支持的消息类型 |
| 400106 | 机器人不存在 | 请确认机器人是否在群中 |
| 410100 | 发送速度太快而限流 | 请降低发送速度 |
| 430101 | 含有不安全的外链 | 请确认发送的内容合法 |
| 430102 | 含有不合适的文本 | 请确认发送的内容合法 |
| 430103 | 含有不合适的图片 | 请确认发送的内容合法 |
| 430104 | 含有不合适的内容 | 请确认发送的内容合法 |

## 安全设置错误码
> 当出现以下错误时，表示消息校验未通过，请查看机器人的安全设置

| 错误码 | 错误信息 | 说明 |
| --- | --- | --- |
| 310000 | keywords not in content | 请确认签名是否正确 |
| 310000 | invalid timestamp | timestamp 无效 |
| 310000 | sign not match | 签名不匹配 |
| 310000 | ip X.X.X.X not in whitelist | IP地址不在白名单 |