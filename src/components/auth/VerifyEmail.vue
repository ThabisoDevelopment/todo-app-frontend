<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'

const router = useRouter()
const route = useRoute()
const token = 
onMounted(async() => {
     try {
        if (!route.query.token) throw 'Sorry! you dont have access to verify email open your mail inbox for intruction'
        console.log(token)
        axios.defaults.headers.common['Authorization']  = route.query.token
        const { data } = await axios.put("/oauth/verify/email")
        notify({
            title: 'User Email Verification Success',
            type: 'success',
            text: data.message
        })
    } catch (error) {
        const errorMessage = error.response? error.response.data :error
        notify({
            title: 'User Email Verification Error',
            type: 'error',
            text: errorMessage
        })
        router.push({ name: 'Login' })
    }
})
</script>
<template> 
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-7 col-xl-6">
                <div class="card shadow border-0 mb-4">
                    <div class="card-body">
                        <h1 class="my-auto h4 py-3 text-center">Email Verification</h1>
                        <p class="text-center my-4">Thank you! now your email have been verified</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-7 col-xl-6 mt-3">
                <p class="my-0 text-center">
                    Go to <router-link :to="{ name: 'Home' }" class="text-decoration-none"> Home page </router-link> or
                    <router-link :to="{ name: 'Login' }" class="text-decoration-none"> Login </router-link>
                </p>
            </div>
        </div>
    </div>
</template>