import {mapGetters, mapState} from "vuex";

export const workspace = {
    computed: {
        ...mapGetters("workspace", {workspace: 'get'}),
    }
}
export const file = {
    computed: {
        ...mapGetters("workspace/storage", ['file']),
    }
}
export const teams = {
    computed: {
        ...mapGetters("workspace", ['teams']),
    }
}
export const tasks = {
    computed: {
        ...mapGetters("workspace", ['tasks']),
    }
}

export const posts = {
    computed: {
        ...mapGetters("workspace", ['posts']),
    }
}

export const users = {
    computed: {
        ...mapGetters("workspace", ['users']),
    }
}

export const archive = {
    computed: {
        ...mapGetters("workspace", ['archive']),
    }
}

export const domen = {
    computed: {
        ...mapState({
            domen: function (state) {
                try {
                    return state.workspace.workspace.domen || '';
                } catch (e) {
                    return ''
                }
            }
        }),
    }
}

export const currentUID = {
    computed: {
        ...mapGetters("user", {
            currentUID: "uid"
        }),
    }
}