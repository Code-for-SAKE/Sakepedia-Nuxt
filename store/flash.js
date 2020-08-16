export const state = () => ({
    text: '',
    mode: 'processing',
    visible: false,
    timeoutId: -1,
    defaultDuration: 10000,
})

export const mutations = {
    setMessage: (state, payload) => {
        state.text = payload.text;
        state.mode = payload.mode;
        state.visible = true;
    },
    setMessageVisible: (state, value) => state.visible = value,
    setMessageTimeoutId: (state, value) => state.timeoutId = value,
    clearMessageTimeoutId: (state) => state.timeoutId = -1,
}

export const actions = {
    show: ({state, commit}, message) => new Promise((resolve, reject) => {
        //timeoutId !== 1 のときはVisibleを変更するsetTimeoutが生きているのでキャンセルする
        if( state.timeoutId !== -1 ) {
            clearTimeout(state.timeoutId);
            commit('clearMessageTimeoutId');
        }
  
        commit('setMessage', message);
  
        if(!message.duration) message.duration=state.defaultDuration;
  
        if( message.duration > 0 ) {
            //durationだけ時間が経ったらVisible=falseとする（メッセージを隠す）
            const timeoutId = setTimeout( () => {
                commit('clearMessageTimeoutId');
                commit('setMessageVisible', false);
                return resolve();
            }, message.duration);
            commit('setMessageTimeoutId', timeoutId);
        } else {
            return resolve();
        }
    })
}