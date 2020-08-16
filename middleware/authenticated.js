export default function ({ store, redirect }) {
    // ユーザーが認証されていないとき
    if (!store.state.auth) {
        console.log("don't login")
        return redirect('/auth/login')
    }
}