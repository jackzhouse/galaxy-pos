export const state = () => ({
    customerId: "",
    pipelineId: ""
})

export const mutations = {
    SET_CUSTOMER_ID(state, payload) {
        state.customerId = payload
    },
    SET_PIPELINE_ID(state, payload) {
        state.pipelineId = payload
    }
}