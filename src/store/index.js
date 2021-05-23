import { createStore } from 'vuex'
import main from "@/store/main";
import auth from '@/store/auth'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  strict: true,
  modules: {
    main,
    auth
  }
})
