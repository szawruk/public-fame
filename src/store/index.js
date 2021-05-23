import { createStore } from 'vuex'
import main from "@/store/main";
import auth from '@/store/auth'
import comments from "@/store/comments";
import posts from "@/store/posts";

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
    auth,
    comments,
    posts
  }
})
