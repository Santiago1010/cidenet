import { defineStore } from 'pinia'

export const useSessionsStore = defineStore('SessionsStore', {
	state: () => ({
		session: false
	}),
	actions: {
		setSession(username, token) {
			sessionStorage.setItem('username', username)
			sessionStorage.setItem('token', token)

			if (sessionStorage.username !== undefined && sessionStorage.token !== undefined) {
				this.session = true
			}
		},
		clearSession() {
			sessionStorage.clear()
			this.session = false
		}
	}
})