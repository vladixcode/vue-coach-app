export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      ...data,
    }

    const response = await fetch(`https://find-coach-vue-app-test-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    })

    if (!response.ok) {
      // error
    }

    // const responseData = await response.json()

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    })
  },
  async fetchCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }

    const response = await fetch(`https://find-coach-vue-app-test-default-rtdb.firebaseio.com/coaches.json`)

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!')
    }

    const coaches = []

    for (const [coachId, coachData] of Object.entries(responseData)) {
      coaches.push({
        id: coachId,
        ...coachData,
      })
    }

    context.commit('setCoaches', coaches)
    context.commit('setFetchTimestamp')
  },
}
