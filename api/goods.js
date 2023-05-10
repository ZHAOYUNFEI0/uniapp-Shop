import request from '@/utils/request'


/**
 * 商品列表搜索
 * @param {*} data 商品id 关键词 页码
 * @returns 
 */
export function getGoodSearchList(data) {
    return request({
        url: '/goods/search',
        data:data
    })
}
/**
 * 获取商品详情
 * @param {*} goods_id 商品id
 * @returns 
 */
export function getGoodsDetailById(goods_id) {
    return request({
        url: '/goods/detail',
        data: {
            goods_id
        }
    })
}

