<script setup>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
defineComponent({ NavigationBar})

const user = reactive({ authorized: false })
const router = useRouter()
router.beforeEach((to, from, next) => {
	user.authorized = to.meta.auth
	next()
})
</script>

<template>
	<navigation-bar v-if="user.authorized" />
	<router-view></router-view>
	<notifications position="top right" />
</template>