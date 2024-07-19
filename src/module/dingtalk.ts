import { RobotDingType, DingMessageConfig, MsgType, ActionCardSingle, ActionCardIndependent } from "../types/dingtalkTypes";
import { AxiosRequestConfig } from "axios";
import { postFn, createSignFn } from "../utils/index";
/* 钉钉机器人 */
export default class RobotDing implements RobotDingType {
    readonly webhook: string;
    readonly secret: string;
    readonly config: AxiosRequestConfig;
    /**
     * 构造函数用于初始化 Webhook 发送器。
     * 
     * @param webhook Webhook 的URL地址，用于发送请求。
     * @param secret 用于验证请求的密钥。
     * @param config 可选的 Axios 请求配置，用于自定义请求行为。
     */
    constructor(webhook: string, secret: string, config?: AxiosRequestConfig) {
        this.webhook = webhook
        this.secret = secret
        this.config = config || {}
    }
    /**
     * 发送钉钉消息。
     * @template T 消息类型，可以是 'text' | 'link' | 'markdown' | 'actionCard' | 'feedCard'
     * @param {T} msgType - 消息类型
     * @param {DingMessageConfig<T>} content - 根据消息类型配置的内容
     * @returns {Promise<any>} 返回一个 Promise 对象，表示消息发送的结果
     * 
     * @example
     * // 发送文本消息
     * sendDing('text', { content: 'Hello, World!', isAtAll: true, atUserIds: ['user1', 'user2'], atMobiles: ['13800000000'] })
     * 
     * @example
     * // 发送链接消息
     * sendDing('link', { title: 'Hello, World!', content: 'This is a link message.', messageUrl: 'https://www.example.com', picUrl: 'https://www.example.com/pic.jpg' })
     * 
     * @example
     * // 发送 markdown 消息
     * sendDing('markdown', { title: 'Hello, World!', content: 'This is a markdown message.', isAtAll: true, atUserIds: ['user1', 'user2'], atMobiles: ['13800000000'] })
     * 
     * @example
     * // 发送 actionCard 消息 - 整体跳转
     * sendDing('actionCard', { title: 'Hello, World!', content: 'This is a actionCard message.', btnOrientation: 0, singleTitle: 'Single Button', singleURL: 'https://www.example.com'})
     * // 发送 actionCard 消息 - 独立跳转
     * sendDing('actionCard', { title: 'Hello, World!', content: 'This is a actionCard message.', btnOrientation: 0, btns: [{ title: 'Button 1', actionURL: 'https://www.example.com/button1' }, { title: 'Button 2', actionURL: 'https://www.example.com/button2' }])
     * 
     * @example
     * // 发送 feedCard 消息
     * sendDing('feedCard', { links: [{ title: 'Hello, World!', messageURL: 'https://www.example.com', picURL: 'https://www.example.com/pic.jpg' }, { title: 'Hello, World!', messageURL: 'https://www.example.com', picURL: 'https://www.example.com/pic.jpg' }] })
     */
    public sendDing<T extends MsgType>(msgType: T, content: DingMessageConfig<T>): Promise<any> {
        return this.sendService(msgType, content)
    }

    protected sendService<T extends MsgType>(msgType: T, postData: DingMessageConfig<T>): Promise<any> {
        let params: object = {}
        switch (msgType) {
            case 'text':
            default:
                const textConfig = postData as DingMessageConfig<'text'>
                params = {
                    msgtype: "text",
                    text: {
                        content: textConfig.content
                    },
                    at: {
                        isAtAll: textConfig?.isAtAll,
                        atUserIds: textConfig.atUserIds,
                        atMobiles: textConfig?.atMobiles,
                    }
                }
                break;
            case 'link':
                const linkConfig = postData as DingMessageConfig<'link'>
                params = {
                    msgtype: "link",
                    link: {
                        title: linkConfig.title,
                        text: linkConfig.content,
                        messageUrl: linkConfig.messageUrl,
                        picUrl: linkConfig.picUrl
                    }
                }
                break
            case 'markdown':
                const markdownConfig = postData as DingMessageConfig<'markdown'>
                params = {
                    msgtype: "markdown",
                    markdown: {
                        title: markdownConfig.title,
                        text: markdownConfig.content
                    },
                    at: {
                        isAtAll: markdownConfig?.isAtAll,
                        atUserIds: markdownConfig.atUserIds,
                        atMobiles: markdownConfig?.atMobiles,
                    }
                }
                break
            case 'actionCard':
                const actionCardConfig = postData as DingMessageConfig<'actionCard'>
                params = {
                    msgtype: "actionCard",
                    actionCard: {
                        title: actionCardConfig.title,
                        text: actionCardConfig.content,
                        btnOrientation: actionCardConfig.btnOrientation,
                        singleTitle: (actionCardConfig as ActionCardSingle).singleTitle,
                        singleURL: (actionCardConfig as ActionCardSingle).singleURL,
                        btns: (actionCardConfig as ActionCardIndependent).btns
                    }
                }
                break
            case 'feedCard':
                const feedCardConfig = postData as DingMessageConfig<'feedCard'>
                params = {
                    msgtype: "feedCard",
                    feedCard: {
                        links: feedCardConfig.links
                    }
                }
                break
        }
        return new Promise(async (resolve, reject) => {
            try {
                const res = await postFn(
                    `${this.webhook}&timestamp=${Date.now()}&sign=${createSignFn(this.secret)}`,
                    params,
                    this.config
                )
                
                if (res.status == 200) {
                    if (res.data.errcode == 0) {
                        resolve(res.data)
                    } else {
                        reject(res.data)
                    }
                } else {
                    reject({
                        errmsg: "接口请求报错",
                        errcode: res.status,
                        errdata: res
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}