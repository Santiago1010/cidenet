import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
	state: () => ({ username: 'Santiago Correa Aguirre', password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' }),
	actions: {
		verifyLogin(user, pass) {
			return user === this.username && pass === this.password
		}
	}
})