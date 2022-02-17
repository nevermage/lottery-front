import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import store from "../store";
import {VueCookieNext} from "vue-cookie-next";

@Module({ namespaced: true, name: 'lots', store: store})
class lots extends VuexModule {
    url: string = process.env.VUE_APP_BACKEND_URL

    lots: object = []
    @Mutation
    addLotsToState(lots: object): void {
        this.lots = lots;
    }
    @Action({ commit: 'addLotsToState' })
    async fetchLots() {
        const response = await fetch(this.url + '/api/lots')
        let lots = await response.json()
        return lots
    }
    get getLots() {
        return this.lots
    }

    lot: object = []
    @Mutation
    addLotToState(lot: object): void {
        this.lot = lot;
    }
    @Action({ commit: 'addLotToState' })
    async fetchLot(id) {
        let response;
        if (VueCookieNext.getCookie('token') === null) {
            response = await fetch(this.url + '/api/lot/' + id);
        } else {
            const headers = {"Authorization": 'Bearer ' + VueCookieNext.getCookie('token')}
            response = await fetch(this.url + '/api/lot/' + id, {headers});
        }
        let lot = await response.json()
        return lot[0]
    }
    get getLot() {
        return this.lot
    }
    
    ownLots: object = []
    @Mutation
    addOwnLotsToState(ownLots: object): void {
        this.ownLots = ownLots;
    }
    @Action({ commit: 'addOwnLotsToState' })
    async fetchOwnLots(id) {
        const response = await fetch(this.url + '/api/lots-created-by/' + id);
        let ownLots = await response.json()
        return ownLots
    }
    get getOwnLots() {
        return this.ownLots
    }
    
    myLots: object = []
    @Mutation
    addMyLotsToState(myLots: object): void {
        this.myLots = myLots;
    }
    @Action({ commit: 'addMyLotsToState' })
    async fetchMyLots() {
        const headers = {"Authorization": 'Bearer ' + VueCookieNext.getCookie('token')}
        const response = await fetch(this.url + '/api/my-lots', {headers});
        let myLots = await response.json()
        return myLots
    }
    get getMyLots() {
        return this.myLots
    }


    wonLots: object = []
    @Mutation
    addWonLotsToState(wonLots: object): void {
        this.wonLots = wonLots;
    }
    @Action({ commit: 'addWonLotsToState' })
    async fetchWonLots(id) {
        const response = await fetch(this.url + '/api/lots-won-by/' + id);
        let wonLots = await response.json()
        return wonLots
    }
    get getWonLots() {
        return this.wonLots
    }
}

export default lots


