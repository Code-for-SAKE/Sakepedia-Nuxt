export const state = () => ({
  user: null,
  auth: false,
});

export const mutations = {
  login(state, payload) {
    state.auth = true;
    state.user = payload;
  },
  logout(state) {
    state.auth = false;
    state.user = null;
  },
};

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    return dispatch("getSession");
  },
  async getSession({ commit }) {
    const session = await this.$axios.$get("/api/session");
    if (session && session.user) {
      commit("login", session.user);
    }
  },
};
