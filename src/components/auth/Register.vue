<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'

const user = reactive({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false
})
const router = useRouter()
// send new user data to register
const register = async() => {
    try {
        if (!user.name || !user.email || !user.password) throw 'All Field are Required'
        user.error = ''
        user.loading = true
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        const { data } = await axios.post("/oauth/register", newUser)
        notify({
            title: 'Account Created Successful',
            type: 'success',
            text: data.message
        })
        router.push({ name: 'Login' })
    } catch (error) {
        user.password = ''
        user.loading = false
        const errorMessage = error.response? error.response.data :error
        user.error = errorMessage
        notify({
            title: 'Create User Error',
            type: 'error',
            text: errorMessage
        })
    }
}
</script>

<template> 
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-7 col-xl-6">
                <div class="card shadow border-0 mb-4">
                    <div class="card-header py-1 border-0 bg-secondary">
                        <h1 class="my-auto h4 py-2 text-center text-light">Create a new account</h1>
                    </div>
                    <div class="card-body">
                        <form action="#" method="post" @submit.prevent="register">
                            <div class="my-3">
                                <label for="name" class="form-label">Name</label>
                                <div class="input-group">
                                    <span class="input-group-text text-secondary" id="name-addon">
                                        <span class="fa fa-user"></span>
                                    </span>
                                    <input type="text" id="name" class="form-control bg-light" v-model="user.name" placeholder="eg: John">
                                </div>
                            </div>
                            <div class="mb-4">
                                <label for="email" class="form-label">Email</label>
                                <div class="input-group">
                                    <span class="input-group-text text-secondary" id="email-addon">
                                        <span class="fa fa-envelope"></span>
                                    </span>
                                    <input type="text" id="email" class="form-control bg-light" v-model="user.email" placeholder="eg: john@mail.com">
                                </div>
                            </div>
                            <div class="mb-4">
                                <label for="password" class="form-label">Password</label>
                                <div class="input-group">
                                    <span class="input-group-text text-secondary" id="password-addon">
                                        <span class="fas fa-lock"></span>
                                    </span>
                                    <input type="password" id="password" class="form-control bg-light" v-model="user.password" placeholder="eg: xsfdT275g45">
                                </div>
                            </div>
                            <div class="row justify-content-center mb-2">
                                <div class="col-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-sm btn-primary px-3" type="submit" :disabled="user.loading">
                                            Create Account
                                            <span v-if="!user.loading" class="fa fa-paper-plane ps-2"></span>
                                            <span v-if="user.loading" class="spinner-grow spinner-grow-sm ms-2" role="status" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p v-if="user.error" class="text-center text-sm text-danger mt-4 mb-2"> {{ user.error }} </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-md-7 col-xl-6 mt-3">
                <p class="my-0 mb-3">
                    Already have an account?
                    <router-link :to="{ name: 'Login' }" class="text-decoration-none"> Login </router-link>
                </p>
                <p class="text-secondary text-sm text-center">
                    By clicking register you agree to our terms and conditions of using our services.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis ab optio expedita asperiores libero
                </p>
            </div>
        </div>
    </div>
</template>