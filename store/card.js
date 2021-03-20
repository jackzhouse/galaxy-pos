// create a store
export const state = () => ({
   FirebaseToken:"",
 });
// getters
// export const getters = {
//     FirebaseToken(state) {
//         return state.FirebaseToken
//     }}

// mutations
// export const mutations = {
//     SET_FIREBASETOKEN(state,FirebaseToken) {
//         state.FirebaseToken = FirebaseToken;
//     }
// };
 export const mutations = {
     SET_FIREBASETOKEN(state, payload){
         state.FirebaseToken = payload
     }
}

// actions
//export const actions = {
//    setFirebaseToken ({commit}, FirebaseToken) {
//        commit("SET_FIREBASETOKEN", FirebaseToken);
//    }
// }
