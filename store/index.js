import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 初始化
    state: {
        cartList:uni.getStorageSync('cartList')
    },
    mutations: {
        setCartList(state, val) {
            state.cartList = val
            uni.setStorageSync('cartList',val)
        }
    },
    getters: {
        isShowAll(state) {
            return state.cartList.every(item => item.goods_select)
        },
        // 计算过滤选中的数据
        selectCartList(state) {
            return state.cartList.filter(item => item.goods_select)
        },

        // 计算总价格
        selectCartListPrice(state, getters) {
            let sum = 0
            getters.selectCartList.forEach(item => {
                sum+= item.goods_price * item.goods_count
            });
            return sum
        },

        // 总数
        selectCarListCount(state, getters) {
            let sum = 0
            getters.selectCartList.forEach(item => {
                sum += item.goods_count
            })
            // console.log(sum);
            return sum
        }
    }
})

export default store