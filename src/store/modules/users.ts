import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import store from "../store";
import {VueCookieNext} from "vue-cookie-next";

@Module({ namespaced: true, name: 'users', store: store})
class lots extends VuexModule {
    url: string = process.env.VUE_APP_BACKEND_URL

    users: object = []
    @Mutation
    addUsersToState(users: object): void {
        this.users = users;
    }
    @Action({ commit: 'addUsersToState' })
    async fetchUsers() {
        const response = await fetch(this.url + '/api/users')
        let users = await response.json()
        return users
    }
    get getUsers() {
        return this.users
    }

    user: object = []
    @Mutation
    addUserToState(user: object): void {
        this.user = user;
    }
    @Action({ commit: 'addUserToState' })
    async fetchUser(id) {
        const response = await fetch(this.url + '/api/user/' + id);
        let user = await response.json()
        return user
    }
    get getUser() {
        return this.user
    }
    
    winners: object = []
    @Mutation
    addWinnersToState(winners: object): void {
        this.winners = winners;
    }
    @Action({ commit: 'addWinnersToState' })
    async fetchWinners() {
        const response = await fetch(this.url + '/api/winners');
        let winners = await response.json()
        return winners
    }
    get getWinners() {
        return this.winners
    }
    
    userInfo: object = []
    @Mutation
    addUserInfo(userInfo: object): void {
        this.userInfo = userInfo;
    }
    @Action({ commit: 'addUserInfo' })
    async fetchUserInfo() {

        let token = VueCookieNext.getCookie('token')
        if (token == null) {
            return 'UnAuthenticated'
        }
        const headers = {"Authorization": 'Bearer ' + token}
        const response = await fetch(this.url + '/api/check-user', {headers})
        let user = await response.json()
        return user
    }

    get getUserInfo() {
        return this.userInfo
    }
}

export default lots


