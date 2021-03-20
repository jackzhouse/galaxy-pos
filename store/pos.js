export const state = () => ({
    carts: [
        {
            posId: "",
            product: [
                {
                    id: "",
                    nama: "",
                    qty: "",
                    harga: "",
                    total: "",
                },
            ],
        },
    ],
});

export const mutations = {
    SET_CARTS(state, carts) {
        state.carts = carts
    },
    SET_CARTSPOSID(state, payload){
        state.carts.posId = payload
    }
}

