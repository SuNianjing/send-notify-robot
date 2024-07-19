import { AxiosRequestConfig } from "axios"

export type MsgType = 'text' | 'link' | 'markdown' | 'actionCard' | 'feedCard'
export type isAtAll = boolean
export type atUserIds = string[] | number[]
export type atMobiles = string[]

/* 文本消息类型 */
interface TextConfig {
    // 消息内容
    content: string
    isAtAll?: isAtAll
    atUserIds?: atUserIds
    atMobiles?: atMobiles
}

/* 链接消息类型 */
interface LinkConfig {
    // 消息标题
    title: string
    // 消息内容, 如果太长只会部分展示
    content: string
    // 点击消息跳转的URL
    messageUrl: string
    // 图片URL
    picUrl?: string
}

/* markdown消息类型 */
interface MarkdownConfig {
    // 首屏会话透出的展示内容
    title: string
    // markdown格式的消息
    content: string
    isAtAll?: isAtAll
    atUserIds?: atUserIds
    atMobiles?: atMobiles
}

/* ActionCard 基础类型 */
interface ActionCardBase {
    // 首屏会话透出的展示内容
    title: string;
    // markdown格式的消息
    content: string;
    // 0：按钮竖直排列 1：按钮横向排列
    btnOrientation?: 0 | 1;
}
/* 整体跳转ActionCard类型 */
export interface ActionCardSingle extends ActionCardBase {
    // 单个按钮的标题
    singleTitle: string;
    // 点击消息跳转的URL
    singleURL: string;
}
/* 独立跳转ActionCard类型 */
export interface ActionCardIndependent extends ActionCardBase {
    btns: Array<{
        // 按钮标题
        title: string;
        // 按钮对应的链接
        actionURL: string;
    }>;
}
/* ActionCard类型 */
type ActionCardConfig = ActionCardSingle | ActionCardIndependent;

/* FeedCard类型 */
interface FeedCardConfig {
    links: Array<{
        // 单条信息文本
        title: string;
        // 点击单条信息到跳转链接
        messageURL: string;
        // 单条信息后面图片的URL
        picURL: string;
    }>;
}

export type ExtractMsgConfig<T extends MsgType> = 
    T extends 'text' ? TextConfig :
    T extends 'link' ? LinkConfig :
    T extends 'markdown' ? MarkdownConfig :
    T extends 'actionCard' ? ActionCardConfig :
    T extends 'feedCard' ? FeedCardConfig :
    never;

/* 消息类型 */
export type DingMessageConfig<T extends MsgType> =
    T extends 'text' ? TextConfig :
    T extends 'link' ? LinkConfig :
    T extends 'markdown' ? MarkdownConfig :
    T extends 'actionCard' ? ActionCardConfig :
    T extends "feedCard" ? FeedCardConfig :
    never;

export interface RobotDingType {
    sendDing<T extends MsgType>(msgType: T, params: DingMessageConfig<T>): Promise<any>
}

/* 钉钉机器人类型 */
export declare class RobotDing {
    readonly webhook: string
    readonly secret: string
    readonly config: AxiosRequestConfig
    constructor(webhook: string, secret: string, config?: AxiosRequestConfig)
    public sendDing<T extends MsgType>(msgType: T, config: DingMessageConfig<T>): Promise<any>
    protected sendService<T extends MsgType>(msgType: T, postData: DingMessageConfig<T>): Promise<any>
}
