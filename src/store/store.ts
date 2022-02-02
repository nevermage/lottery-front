import Vuex, { Store } from "vuex";
import lots from "./modules/lots";
import users from "./modules/users";
import {getModule} from "vuex-module-decorators";

const store: Store<unknown> = new Vuex.Store<unknown>({
    modules: {
        lots: lots,
        users: users
    }
});

export default store

export const lotsModule = getModule(lots, store)
export const usersModule = getModule(users, store)
