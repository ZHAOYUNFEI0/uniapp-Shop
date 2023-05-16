import request from '@/utils/request'


/**
 * 小程序用户登录- 获取用户token，-普通开发中无法调用
 * @param {*} data 商品id 关键词 页码
 * @returns 
 */
export function usersWxLogin(data) {
    return request({
        method:'POST',
        url: '/users/wxlogin',
        data:data
    })
}


