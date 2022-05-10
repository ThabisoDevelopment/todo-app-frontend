<script setup>

const username = localStorage.getItem('username') || 'username'
const logout = ()=> {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.href = "/oauth/login"
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark shadow bg-nav-bar">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'Home' }">
                <span class="fw-bold h3">TODO</span>
                <small class="text-sm px-2">by anestordev</small>
            </router-link>

            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item mx-3">
                    <router-link class="nav-link" to="#">Todos</router-link>
                </li>
                <li class="nav-item ms-3 dropdown">
                    <router-link to="#" class="nav-link dropdown-toggle" id="navbarDropdownMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="fa fa-user"></span>
                        {{ username }}
                    </router-link>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenu">
                        <li>
                            <router-link class="dropdown-item py-2" :to="{ name: 'User' }">
                                <span class="fa fa-user pe-2"></span> Profile
                            </router-link>
                        </li>
                        <li>
                            <button class="dropdown-item py-2" @click="logout">
                                <span class="fa fa-sign-out-alt pe-2"></span> logout
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
