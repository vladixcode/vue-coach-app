/**
 * * API keys for Firebase services are not secret therefore can be safely embeded in client code
 * https://firebase.google.com/support/guides/security-checklist#api-keys-not-secret
 */
const API_KEY = 'AIzaSyCw0kXFyq3R1LAfeKqSA-UehodTThSDirw'

export default {
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      },
    )

    const responseData = await response.json()

    if (!response.ok) {
      let errMsg = 'Failed to sign you in. Please check the sign up credentials.'

      /**
       * TODO: Implement better error message handling.
       */
      if (responseData.error.message === 'EMAIL_NOT_FOUND') {
        errMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.'
      } else if (responseData.error.message === 'INVALID_PASSWORD') {
        errMsg = 'The password is invalid or the user does not have a password.'
      } else if (responseData.error.message === 'USER_DISABLED') {
        errMsg = 'The user account has been disabled by an administrator.'
      }
      throw new Error(errMsg)
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    })
  },
  async signup(context, payload) {
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
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null,
    })
  },
}
