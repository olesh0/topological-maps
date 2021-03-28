export default {
  namespaced: true,

  state: {
    cursorPosition: {
      lat: 0,
      lng: 0,
    },
  },

  getters: {
    cursorPosition: ({ cursorPosition }) => cursorPosition,
  },

  mutations: {
    setCursorPosition(state, position) {
      state.cursorPosition = position
    },
  },

  actions: {},
}
