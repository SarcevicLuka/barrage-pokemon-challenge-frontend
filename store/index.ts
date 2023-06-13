import { createStore } from "vuex";
import * as actions from './actions';
import * as mutations from './mutations';

const state = {
    userToken: "",
    errors: ""
}

export const store = createStore({
    state,
    actions,
    mutations
})