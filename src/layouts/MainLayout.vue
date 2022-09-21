<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-toolbar-title>
                    Prueba técnica Santiago Correa Aguirre
                </q-toolbar-title>

                <q-separator />

                <q-btn v-if="sessionStore.session" flat color="white" label="cerrar sesión" @click="logout">
                    <q-tooltip>Haz click para finalizar la sesión.</q-tooltip>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white text-center">
            <q-toolbar>
                <q-toolbar-title>
                    <div><span class="desktop-only">Prueba técnica</span> Santiago Correa<span class="desktop-only"> Aguirre</span> &copy; {{ new Date().getFullYear() }}</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useQuasar } from 'quasar'

    import { useSessionsStore } from '../assets/plugins/SessionsStore.js'

    const $router = useRouter()
    const $q = useQuasar()

    const sessionStore = useSessionsStore()

    const logout = () => {
        sessionStore.clearSession()

        $q.notify({
            color: 'info',
            textColor: 'white',
            icon: 'logout',
            message: 'Se ha cerrado tu sesión'
        })

        $router.push("/")
    }
</script>