import axios, { AxiosRequestConfig, AxiosPromise } from "axios"
import HmacSHA256 from "crypto-js/hmac-sha256"
import Base64 from "crypto-js/enc-base64"

/**
 * 使用axios库发送一个POST请求。
 * 
 * 此函数封装了axios的post方法，提供了基本的请求构造和错误处理。
 * 它旨在简化对API的POST请求过程，通过提供一个简洁的调用接口。
 * 
 * @param url 请求的URL地址。
 * @param data 发送的数据对象。
 * @param config 可选的配置对象，用于自定义请求设置。
 * @returns 返回一个Promise，解析为响应数据。
 */
export function postFn(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return axios.post(
        url,
        data,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            timeout: 10000,
            ...config
        }
    )
}

/**
 * 生成钉钉签名
 * 
 * @param secret 秘密钥，用于计算签名的基础密钥。
 * @param timestamp 请求的时间戳，用于防止重放攻击。
 * @returns {string} 生成的签名字符串。
 */
export function createSignFn(secret: string, timestamp: number = Date.now()): string {
    const strToSign = `${timestamp}\n${secret}`; // 生成待签名的字符串
    const hash = HmacSHA256(strToSign, secret); // 使用 HmacSHA256 算法计算签名
    const signData = Base64.stringify(hash); // 将签名转换为 Base64 编码

    return encodeURIComponent(signData);
}