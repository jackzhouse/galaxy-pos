export const state = () => ({
  user: {},
  company: {},
  listCompany: [],
  status: true,
  solutions: [],
  roles: [],
  photoUrl: ""
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_COMPANY(state, payload) {
    state.company = payload;
  },
  SET_LIST_COMPANY(state, payload) {
    state.listCompany = payload;
  },
  SET_STATUS(state, payload) {
    state.status = payload;
  },
  SET_SOLUTIONS(state, payload) {
    state.solutions = payload;
  },
  SET_ROLES(state, payload) {
    state.roles = payload;
  },
  SET_PHOTO_URL(state, payload) {
    state.photoUrl = payload;
  },
};
