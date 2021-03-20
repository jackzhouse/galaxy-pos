//import swal from "sweetalert2";
//import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
    },
    data(){
        return {
            productOrder: [],
            totalItem:"",
            totalPrice:"",
            form: {
                paymentType:"",
                paid:"",
                changes:"",
            },
            paymentOptions: [
                {
                    label:"cash",
                    value:"cash"
                },
                {
                    label:"transfer va",
                    value:"transfer_va"
                },
                {
                    label:"kartu kredit",
                    value:"kartu_kredit"
                },
                {
                    label:"emoney",
                    value:"emoney"
                },
                {
                    label:"katalis",
                    value:"katalis"
                },
                {
                    label:"internal",
                    value:"internal"
                },
            ],
            merchantOptions : [
                {
                    label:"COD",
                    value:"cod"
                },
                {
                    label:"VA BNI",
                    value:"va_bni"
                },
                {
                    label:"KK VISA",
                    value:"kk_visa"
                },
                {
                    label:"kk mastercard",
                    value:"kk_mastercard"
                },
                {
                    label:"dana",
                    value:"dana"
                },
                {
                    label:"ovo",
                    value:"ovo"
                },
                {
                    label:"gopay",
                    value:"gopay"
                },
                {
                    label:"linkaja",
                    value:"linkaja"
                }
            ],
        };
    },
    beforeMount() {
        this.getDataOrder()
    },
    methods: {
        getDataOrder() {
            this.$axios
                .$get(
                    `main_c/pos/get_data_order/${this.$route.query.orderId}`
                )
                .then((response) => {
                    console.log(response)
                    this.productOrder = response.productOrder;
                    this.totalItem = response.totalItem;
                    this.totalPrice = response.totalPrice;
                })
        },
        toCurrencyString(number) {
            return number.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
        },
    },
}
