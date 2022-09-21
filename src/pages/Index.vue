<template>
	<q-card class="my-card q-pa-md q-ma-md">
		<q-form @submit="login">
			<q-card-section class="text-center">
				<h4>Iniciar Sesión</h4>
			</q-card-section>

			<q-card-section>
				<q-input outlined type="text" v-model="username" label="Nombre de usuario" hint="Ingresa tu nombre de usuario." class="q-my-sm" lazy-rules :rules="[ val => val && val.length > 0 || 'Falta un nombre de usuario.']">
					<q-tooltip>Ingresa tu nombre de usuario.</q-tooltip>
				</q-input>

				<q-input outlined :type="seePassword ? 'text' : 'password'" v-model="password" label="Contraseña" hint="Ingresa tu contraseña." class="q-my-sm" lazy-rules :rules="[ val => val && val.length > 0 || 'Falta la contraseña.']">
					<template v-slot:append>
						<q-icon :name="seePassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="seePassword = !seePassword" />
					</template>

					<q-tooltip>Ingresa tu contraseña.</q-tooltip>
				</q-input>
			</q-card-section>

			<q-card-actions>
				<q-btn type="submit" @click="login" color="positive" label="iniciar sesión" icon-right="login" class="btn-large q-mt-sm">
					<q-tooltip>Haz click o presiona enter para iniciar sesión.</q-tooltip>
				</q-btn>
			</q-card-actions>
		</q-form>
	</q-card>
</template>

<script setup>
	import { ref } from 'vue'
	import { useQuasar } from 'quasar'
	import { useRouter } from 'vue-router'

	import { useUserStore } from '../assets/plugins/UserStore.js'
	import { useSessionsStore } from '../assets/plugins/SessionsStore.js'

	import * as crypto from "crypto-js";

	const $q = useQuasar()
	const $router = useRouter()

	const username = ref(null)
	const password = ref(null)

	const usersStore = useUserStore()
	const sessionStore = useSessionsStore()

	const seePassword = ref(false)

	console.log(crypto.SHA256('admin').toString())

	sessionStorage.clear()

	const login = () => {
		if (username.value !== null && password.value !== null) {
			if (usersStore.verifyLogin(username.value, crypto.SHA256(password.value).toString())) {
				$q.notify({
					color: 'green-4',
					textColor: 'white',
					icon: 'login',
					message: 'Hola de nuevo, ' + username.value + '.'
				})

				sessionStore.setSession(username.value, crypto.SHA256(username.value).toString())

				$router.push('/inicio')
			}else {
				$q.notify({
					color: 'red-5',
					textColor: 'white',
					icon: 'cancel',
					message: 'Error al iniciar sesión'
				})
			}
		}else {
			$q.notify({
				color: 'red-5',
				textColor: 'white',
				icon: 'cancel',
				message: 'Faltan los datos obligatorios'
			})
		}

		password.value = null
	}
</script>