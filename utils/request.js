const { async } = require("../../dist/dev/mp-weixin/common/vendor")

// 请求基地址
const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

const request = async(config) => {
    // 如果没有 method 就默认使用 GET
    config.method = config.method || 'GET'
    // 添加 baseURL
    config.url = baseURL + config.url

    // 根据加工后的配置发送网络请求
    const [err, res] = await uni.request(config)
    if (!err) {
        return res
    }else{
        console.log('有错误',err);
    }
}

export default request