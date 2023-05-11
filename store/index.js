import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 初始化
    state: {
        cartList: [{
            goods_id: 888,
            goods_small_logo: 'http://image2.suning.cn/uimg/b2c/newcatentries/0070177617-000000000618993401_2_400x400.jpg',
            goods_name:'【包邮送大礼】小米(mi) 小米电视4A 49英寸 标准版 智能网络液晶平板电视机',
            goods_price: 5899,
            goods_count: 3,
            goods_select:true
        }]
    },
    mutations: {
    
    }
})

export default store