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
  async fetchCoaches(context) {
    const response = await fetch(`https://find-coach-vue-app-test-default-rtdb.firebaseio.com/coaches.json`)

    if (!response.ok) {
      // error
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
  },
}
