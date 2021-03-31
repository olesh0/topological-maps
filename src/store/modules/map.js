export default {
  namespaced: true,

  state: {
    cursorPosition: {
      lat: 0,
      lng: 0,
    },
    map: null,
  },

  getters: {
    cursorPosition: ({ cursorPosition }) => cursorPosition,
    map: ({ map }) => map,
  },

  mutations: {
    setCursorPosition(state, position) {
      state.cursorPosition = position
    },
    setMap(state, map) {
      state.map = map
    },
  },

  actions: {
    addMapListener({ getters }, { eventName, callback }) {
      const { map } = getters

      if (!map) throw new Error('Map is not registered...')

      console.log(`registered ${eventName} handler for map`)
      map.on(eventName, callback)

      return () => {
        console.log('here should be cleanup...')
      }
    },
  },
}
