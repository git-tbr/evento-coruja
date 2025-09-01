import { defineStore } from 'pinia'
export const useSiteStore = defineStore('siteStore', {
  state: () => ({
    isAuthenticated: sessionStorage.getItem('isAuthenticated') ?? false,
    name: sessionStorage.getItem('name') ?? '',
    email: sessionStorage.getItem('email') ?? '',
    userid: sessionStorage.getItem('userid') ?? 0,
    tbread: 1022,
    evento: 384,
    company: 22,
    pagamentoAluno: 'price_1S2XuWGmwrpUlslz56gjFokn',
    pagamentoNovo: 'price_1S2XgJGmwrpUlslzI2ZBHIGd'
  }),
  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.name = userData.name
      this.email = userData.email
      this.userid = userData.id
    },
    logout() {
      sessionStorage.clear()
      this.isAuthenticated = false
      this.name = ''
      this.email = ''
      this.userid = 0
    },
  },
})
