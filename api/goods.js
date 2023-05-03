import request from '@/utils/request'

export function getGoodSearchList(data) {
    return request({
        url: '/goods/search',
        data:data
    })
}

