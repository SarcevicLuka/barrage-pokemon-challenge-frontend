import { createStore } from "vuex";
import * as actions from './actions';
import * as mutations from './mutations';

const state = {
    isUserActive: false,
    pending: false,
}

export const store = createStore({
    state,
    actions,
    mutations
})