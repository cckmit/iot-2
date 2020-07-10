const state = {
    modal_list: []
}

function getModalByIndex(index) {
    return state.modal_list[index] || null;
}

function getIndexById(id) {
    return state.modal_list.findIndex(m => m.id === id);
}

function getIndexByModal(modal) {
    return state.modal_list.findIndex(m => modal === m);
}

const mutations = {
    ADD_MODAL(state, modal) {
        state.modal_list.push(modal);
    },

    DELETE_MODAL(state, index) {
        state.modal_list.splice(index, 1);
    },

    DELETE_ALL_MODAL(state) {
        state.modal_list = [];
    },

    SET_COMPONENT(state, { index, component }) {
        const modal = getModalByIndex(index);

        if (modal) {
            modal.component = component;
        }
    },

    SET_DATA(state, { index, data }) {
        const modal = getModalByIndex(index);

        if (modal) {
            modal.data = data;
        }
    },

    SET_TITLE(state, { index, title }) {
        const modal = getModalByIndex(index);

        if (modal) {
            modal.title = title;
        }
    },

    SET_VISIBLE(state, { index, visible }) {
        const modal = getModalByIndex(index);

        if (modal) {
            modal.visible = visible;
        }
    },

    SET_ACTIONS(state, { index, actions }) {
        const modal = getModalByIndex(index);

        if (modal) {
            modal.actions = actions;
        }
    }
}

const actions = {
    add({
        commit
    }, modal) {
        commit('ADD_MODAL', modal);
    },

    open({
        commit
    }, modal) {
        const index = getIndexByModal(modal);
        commit('SET_VISIBLE', {
            index,
            visible: true
        });
    },

    close({
        commit
    }, modalId) {
        const index = getIndexById(modalId, state);

        if (index >= 0) {
            commit('SET_VISIBLE', {
                index,
                visible: false
            });
        }
    },

    remove({
        commit
    }, modalId) {
        const index = getIndexById(modalId, state);

        if (index >= 0) {
            commit('SET_COMPONENT', {
                index,
                component: null
            });
            commit('SET_TITLE', {
                index,
                title: null
            });
            commit('SET_ACTIONS', {
                index,
                actions: []
            });
            commit('SET_DATA', {
                index,
                data: null
            });
            commit('DELETE_MODAL', index);
        }
    },

    removeAll({ commit }) {
        commit('DELETE_ALL_MODAL');
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}