import Vue from "vue";
import Vuex from "vuex";
import Article from "./article";
import UserModule from "./user";
import RBAC from "./rbac"
import Register from "./register";
import i18n from '@/plugins/i18n';

const LOGIN = "/api/login"
const REGISTRATION = "/api/registration"
const CHECK_AUTH = "/api/check-auth"

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: { user_manager: UserModule, article: Article, rbac: RBAC, register: Register },
    state: {
        $server: {},
        languages: [
            { flag: 'us', language: 'en', title: 'English' },
            { flag: 'ua', language: 'uk', title: 'Українська' }
        ],
        current_locale: 'uk',
        layout: 'clean-layout',
        authenticated: false,
        loading: true,
        user: {},
    },
    getters: {
        permissions(state) {
            return state.user.permissions || []
        },
        accessAny: state  => (...data ) => {
            return data.some( (e) => {
                if ( e == '@' ) return state.authenticated 
                return (state.user.permissions || []).includes(e)
            })
        },
        accessAll: state => (...data ) => {
            return !data.some( (e) => {
                if ( e == '@' ) return !state.authenticated 
                return !(state.user.permissions || []).includes(e)
            })
        }
    },
    mutations: {
        SetUser(state, data) {
            state.user = data
            state.$server.setUser(data)
        },
        SetLocale(state, data) {
            i18n.locale = data
            state.current_locale = data
            state.$server.setLocale(data)
        },
        SetUserPermissions(state, data){
            state.user_permissions = data || []
        },
        SetLayout(state, data) {
            state.layout = data
        },
        SetServer(state, server) {
            state.$server = server
        },
        SetServerToken(state, token) {
            state.$server.setToken(token)
        },
        SetAuthenticated(state, val) {
            state.authenticated = val
            state.layout = (val) ? 'app-layout' : 'clean-layout'  
        },
        _serverLogout(state) {
            state.$server.logout()
        }
    },
    actions: {
        async initApp( context ) {
            let data = await context.rootState.$server.request(CHECK_AUTH, {}, 'GET')
            if ( data.status != 200 ) {
                context.dispatch("logout")
                return false
            } 
            context.commit('SetAuthenticated', true )
            context.commit('SetUser', context.rootState.$server.getUser() || {} )
            context.commit('SetLocale', context.rootState.$server.getLocale() || "uk" )
            
            return true
        },
        async login(context, data) {
            let response = await context.rootState.$server.request(LOGIN, data, 'POST')
            response.status == 200 && context.dispatch('auth', response.data)
            return response
        },
        async registration(context, data) {
            let response = await context.rootState.$server.request(REGISTRATION, data, 'POST')
            response.status == 200 && context.dispatch('auth', response.data)
            return response
        },
        async authenticatedRequest(context, request) {
            let response = await context.rootState.$server.request(request.url, request.data || {}, request.method || "GET", request.headers || null)
            response.status == 401 && context.dispatch("logout")
            return response
        },
        logout({ commit }) {
            commit('SetAuthenticated', false)
            commit('SetServerToken', '')
            commit('SetUser', {})
            commit('_serverLogout')
            commit('user_manager/setUserList', [])
            commit('rbac/setRoles', [])
            commit('rbac/setPermissions', [])
        },
        auth({ commit }, {token, user }) {
            commit('SetServerToken', token)
            commit('SetUser', user)
            commit('SetAuthenticated', true)
        },
    }
})