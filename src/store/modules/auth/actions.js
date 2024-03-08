/**
 * * API keys for Firebase services are not secret therefore can be safely embeded in client code
 * https://firebase.google.com/support/guides/security-checklist#api-keys-not-secret
 */
const API_KEY = 'AIzaSyCw0kXFyq3R1LAfeKqSA-UehodTThSDirw'
let logoutTimer

export default {
  login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    })
  },
  signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    })
  },
  async auth(context, payload) {
    const mode = payload.mode

    let endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    if (mode === 'signup') {
      endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })

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

    const expiresIn = +responseData.expiresIn * 1000
    // const expiresIn = 5000 // testing
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    logoutTimer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })
  },
  autoLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    logoutTimer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(logoutTimer)

    context.commit('setUser', {
      userId: null,
      token: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
}
