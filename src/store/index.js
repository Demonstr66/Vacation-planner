import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import workspace from './workspace'
import message from './message'
import access from './access'
import {getAuth} from "firebase/auth";

const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appName: 'Vacation CRM',
        accessLevel: 0
    },
    getters: {
        getAppName: (s) => s.appName,
        getAccessLevel: (s) => s.accessLevel,
    },
    mutations: {
        setAccessLevel: (s, v) => s.accessLevel = v
    },
    actions: {
        async onBeforeLoadingHandler({dispatch}) {
            try {
                if (await dispatch('setAuthState')) {
                    await dispatch('user/getCurrentUserData')
                    await dispatch('workspace/getAllData')
                    dispatch('user/db/setAsActive')
                }
            } catch (e) {
                dispatch("signOut")
            }

            dispatch('setAccessLevel')
        },
        onLoadHandler({dispatch, commit}) {
            dispatch('onSignIn')
        },
        authStateChanged({dispatch}) {
            dispatch('setAuthState').then(
                dispatch('setAccessLevel')
            )
        },
        clearAllPersData({commit}) {
            commit('setAuth', false)
            commit('setEmailVerified', false)
            commit('setLogging', false)

            commit('user/clear')
            commit('workspace/clear')
        },
        async onSignIn({dispatch}) {
            const auth = getAuth();
        },
        setAccessLevel({commit, getters}) {
            const isAuth = getters['isAuth']
            const isEmailVerified = getters['isEmailVerified']
            const isLogging = getters['isLogging']

            let accessLevel

            switch (true) {
                case (!isAuth):
                    accessLevel = 0;
                    break;
                case (!isEmailVerified):
                    accessLevel = 1;
                    break;
                case (isLogging):
                    accessLevel = 2;
                    break;
                default:
                    accessLevel = 0;
                    break;
            }

            commit('setAccessLevel', accessLevel)
        },
        logUser({dispatch}) {
            const auth = getAuth();
            dispatch('test')
            console.log(auth.currentUser)
        },
        testSendResponse() {
            axios.get('http://localhost:3000/user/set/permission/base', {
                params: {
                    u: 'uid_123123123'
                }
            }).then(res => console.log(res))
        }
    },
    modules: {
        auth,
        message,
        access,
        user,
        workspace
    }
})
