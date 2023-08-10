import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account-store', {
  state: () => ({
    token: useLocalStorage('token', ''),
  }),

  actions: {
    login(token: string) {
      this.token = token
    },

    logout() {
      this.token = ''
    },
  },

  getters: {
    isLoggedIn: state => !!state.token,
  },
})
