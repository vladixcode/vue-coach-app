export default {
  contactCoach(constext, payload) {
    const newRequest = {
      id: new Date().toISOString(), // Temp dummy id
      coachId: payload.coachId,
      userEmail: payload.userEmail,
      message: payload.message,
    }
    constext.commit('addRequest', newRequest)
  },
}
