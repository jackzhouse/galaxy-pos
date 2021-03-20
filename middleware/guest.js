export default function({ store, redirect }) {
    var user = store.getters["user"];
    console.log(user);
    // if (store.getters["authenticated"]) {
    //     return redirect("/dashboard");
    // } else {
    //     return redirect("/");
    // }
}