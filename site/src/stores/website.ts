import { defineStore } from "pinia";
export const useSiteStore = defineStore('siteStore',{
  state: () => ({
    isAuthenticated: sessionStorage.getItem('isAuthenticated') ?? false,
    name: sessionStorage.getItem('name') ?? '',
    email: sessionStorage.getItem('email') ?? '',
  }),
  actions: {
    login(userData: {name: string; email: string}){
      this.isAuthenticated = true
      this.name = userData.name
      this.email = userData.email
    },
    logout(){
      sessionStorage.clear()
      this.isAuthenticated = false
      this.name = ''
      this.email = ''
    }
  },
})