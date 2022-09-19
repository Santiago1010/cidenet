import { createRouter, createWebHistory } from 'vue-router'

// Importar layouts
import MainLayout from '../../layouts/MainLayout.vue'
//import SessionLayout from '../../layouts/SessionLayout.vue'

import Index from '../../pages/Index.vue'

//import NotPermissions from '../../pages/NotPermissions.vue'
import NotFound from '../../pages/NotFound.vue'

const routes = [
	{
		path: '/',
		component: MainLayout,
		children: [
			{
				path: '/',
				component: Index
			},
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: NotFound
	},
	{
		path: '/:pathMatch(.*)',
		name: 'bad-not-found',
		component: NotFound
	},
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

router.resolve({
	name: 'not-found',
	params: { pathMatch: ['not', 'found'] },
}).href 

export default router;