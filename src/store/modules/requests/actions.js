export default {
  async fetchCoachRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token

    const response = await fetch(
      `https://find-coach-vue-app-test-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}>`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data! Try again later.')
    }

    const responseData = (await response.json()) ?? {}

    context.commit('setRequests', Object.values(responseData))
  },
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.userEmail,
      message: payload.message,
    }

    const response = await fetch(
      `https://find-coach-vue-app-test-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to contact a Coach! Try again later.')
    }
  },
}
