import {createStore} from "vuex";
import lots from "@/store/modules/lots";
import users from "@/store/modules/users"

export default createStore({
  modules: {
    lots,
    users
  }
});
