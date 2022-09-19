<template>
	<q-card class="my-card q-pa-md q-ma-md">
		<q-form @submit="login">
			<q-card-content class="text-center">
				<h4>Iniciar Sesión</h4>
			</q-card-content>

			<q-card-content>
				<q-input outlined type="text" v-model="username" label="Nombre de usuario" hint="Ingresa tu nombre de usuario." class="q-my-sm" lazy-rules :rules="[ val => val && val.length > 0 || 'Falta un nombre de usuario.']">
					<q-tooltip>Ingresa tu nombre de usuario.</q-tooltip>
				</q-input>

				<q-input outlined :type="seePassword ? 'text' : 'password'" v-model="password" label="Contraseña" hint="Ingresa tu contraseña." class="q-my-sm" lazy-rules :rules="[ val => val && val.length > 0 || 'Falta la contraseña.']">
					<template v-slot:append>
						<q-icon :name="seePassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="seePassword = !seePassword" />
					</template>

					<q-tooltip>Ingresa tu contraseña.</q-tooltip>
				</q-input>
			</q-card-content>

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

	const $q = useQuasar()

	const username = ref(null)
	const password = ref(null)

	const seePassword = ref(false)

	const login = () => {
		if (username.value !== null && password.value !== null) {
			$q.notify({
				color: 'green-4',
				textColor: 'white',
				icon: 'login',
				message: 'Inicia sesión'
			})
		}else {
			$q.notify({
				color: 'red-5',
				textColor: 'white',
				icon: 'cancel',
				message: 'Error al iniciar sesión'
			})
		}
	}
</script>