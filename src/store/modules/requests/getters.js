export default {
  requests(state) {
    return state.requests
  },
  hasRequests(_state, getters) {
    return !!getters.requests.length
  },
}
