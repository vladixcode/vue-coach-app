export default {
  login() {},
  async signup(context, payload) {
    const API_KEY = 'AIzaSyCw0kXFyq3R1LAfeKqSA-UehodTThSDirw'
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to authenticate.')
    }

    const responseData = await response.json()

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    })
  },
}
