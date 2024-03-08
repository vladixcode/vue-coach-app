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

    const responseData = await response.json()

    if (!response.ok) {
      let errMsg = 'Failed to sign you up. Please check the sign up credentials.'
      if (responseData.error.message === 'EMAIL_EXISTS') {
        errMsg = 'The email address you provided is already taken.'
      }
      throw new Error(errMsg)
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    })
  },
}
