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
    }
})

export default store