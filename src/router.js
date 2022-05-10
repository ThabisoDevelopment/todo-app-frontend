import { notify } from '@kyvg/vue3-notification'
import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: { auth: true },
            component: () => import('./components/Home.vue')
        },
        {
            path: '/user',
            name: 'User',
            meta: { auth: true },
            component: () => import('./components/User.vue')
        },
        {
            path: '/oauth/login',
            name: 'Login',
            meta: { auth: false },
            component: () => import('./components/auth/Login.vue')
        },
        {
            path: '/oauth/register',
            name: 'Register',
            meta: { auth: false },
            component: () => import('./components/auth/Register.vue')
        },
        {
            path: '/oauth/forgot',
            name: 'ForgotPassword',
            meta: { auth: false },
            component: () => import('./components/auth/ForgotPassword.vue')
        },
        {
            path: '/oauth/reset',
            name: 'ResetPassword',
            meta: { auth: false },
            component: () => import('./components/auth/ResetPassword.vue')
        },
    ]
})

router.beforeEach(async(to, from, next) => {
	try {
		if (to.meta.auth) {
			await axios.post('/oauth/verify')
			next()
		}
		else next()
	} catch (error) {
		next({ name: 'Login' })
        const errorMessage = error.response? error.response.data :error
		notify({
			title: "User Authorization Error",
            type: 'error',
			text: errorMessage
		})
	}
})

export default router