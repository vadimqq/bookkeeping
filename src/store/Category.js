import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory ({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const post = await firebase.database().ref(`users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: post.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
