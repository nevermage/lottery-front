
export default {
    state: {
        url: process.env.VUE_APP_BACKEND_URL,
        lot: [],
        lots: [],
        own: [],
        won: [],
    },

    getters: {
        getLots: (state) => state.lots,
        getLot: (state) => state.lot,
        getOwn: (state) => state.own,
        getWon: (state) => state.won,
    },

    actions: {
        fetchLots: async ({commit, state}) => {
            const response = await fetch(state.url + '/api/lots');
            let lots = await response.json();
            commit('addLotsToState', lots);
        },
        fetchLot: async ({commit, state}, id) => {
            const response = await fetch(state.url + '/api/lot/' + id);
            let lot = await response.json();
            commit('addLotToState', lot[0])
        },
        fetchOwn: async ({commit, state}, id) => {
            const response = await fetch(state.url + '/api/lots-created-by/' + id);
            let lots = await response.json();
            commit('addOwnToState', lots)
        },
        fetchWon: async ({commit, state}, id) => {
            const response = await fetch(state.url + '/api/lots-won-by/' + id);
            let lots = await response.json();
            commit('addWonToState', lots)
        },
    },

    mutations: {
        addLotsToState: (state, lots) => {
            state.lots = lots;
        },
        addLotToState: (state, lot) => {
            state.lot = lot;
        },
        addOwnToState: (state, lots) => {
            state.own = lots;
        },
        addWonToState: (state, lots) => {
            state.won = lots;
        },
    }

}
