export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      ...data,
    }

    const token = context.rootGetters.token

    const response = await fetch(
      `https://find-coach-vue-app-test-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      },
    )

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

    if (!response.ok) {
      throw new Error(response.message || 'Failed to fetch data! Try again later.')
    }
    const responseData = await response.json()

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
