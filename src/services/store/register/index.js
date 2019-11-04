const REGISTER = "/api/drivers"

export default {
    namespaced: true,
    state: {
        list: [],
    },
    mutations: {
        toggleEnable(state, id) {
            state.list.forEach(e => {
                if( e.id == id ) {
                    e.is_enabled = !e.is_enabled 
                }
            });
        },
        toggleActive(state, id) {
            state.list.forEach(e => {
                if( e.id == id ) {
                    e.is_active = !e.is_active 
                }
            });
        },
        setList: ( state, payload ) => {
            state.list = payload
        },
        updateRegister: ( state, payload ) => {
            state.list.forEach(e => {
                if( e.id == payload.id ) {
                    Object.assign(e, payload)
                }
            });
        }
    },
    actions: {
        async loadList(context, data) {
            let response = await context.dispatch('authenticatedRequest', { url: REGISTER }, { root: true } )
            response.status == 200 && context.commit("setList", response.data.drivers || [])
            return response
        },
        async updateRegister(context, item) {
            let response = await context.dispatch('authenticatedRequest', { url: `${REGISTER}/${item.id}`, data: item, method: "PUT" }, { root: true } )
            response.status == 200 && context.commit("updateRegister", item)
            return response
        }
    }
}