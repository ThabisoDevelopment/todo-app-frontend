<script setup>
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const todo =  reactive({
	loading: false,
    id: route.params.id,
	todo: '',
    list: [],
    done: false,
    todo_date: null,
    due_date: null,
    createdAt: null,
    updatedAt: null
})

const full_date = data => {
    if(!data) return null
	const DD = new Date(data)
	const year = DD.getFullYear()
	const month = ("0" + (DD.getMonth() + 1)).slice(-2)
	const day_of_month = ("0" + DD.getDate()).slice(-2)
	const time = `${DD.getHours()}:${DD.getMinutes()}`
	return `${year}-${month}-${day_of_month} ${time}`
}

onMounted(async() => {
    try {
		const { data } = await axios.get(`/todos/${route.params.id}`)
		todo.todo = data.todo
        todo.done = data.done
        todo.todo_date = full_date(data.todo_date)
        todo.due_date = full_date(data.due_date)
        todo.createdAt = full_date(data.createdAt)
        todo.updatedAt = full_date(data.updatedAt)
        data.list.forEach(item => todo.list.push(item))
		todo.loading = false
	} catch (error) {
        todo.loading = false
        const errorMessage = error.response? error.response.data :error
        notify({
            title: 'Error Getting Users Todos',
            type: 'error',
            text: errorMessage 
        })
	}
})

const todo_complete = async() => {
	try {
		const { data } = await axios.put(`/todos/done/${route.params.id}`)
        todo.done = true
		notify({
            title: 'Updating Todo Successfull',
            type: 'success',
            text: data.message 
        })
	} catch (error) {
		const errorMessage = error.response? error.response.data :error
        notify({
            title: 'Error Updating Todo',
            type: 'error',
            text: errorMessage 
        })
	}
}

const router = useRouter()
const todo_destroy = async() => {
	try {
		const { data } = await axios.delete(`/todos/${route.params.id}`)
        router.push({ name: 'Home'})
		notify({
            title: 'Deleting Todo Successfull',
            type: 'success',
            text: data.message 
        })
	} catch (error) {
		const errorMessage = error.response? error.response.data :error
        notify({
            title: 'Error Delete Todo',
            type: 'error',
            text: errorMessage 
        })
	}
}
</script>

<template>
	<div class="container">
        <div class="row">
			<div class="col-md-8 py-3">				
				<div class="card border-0 shadow">
					<div class="card-header border-0 d-flex justify-content-between text-light text-sm" :class="{'bg-secondary': todo.done, 'bg-success': !todo.done}">
						<span class="my-auto fw-bold">Todo Date: {{ todo.todo_date }}</span>
						<span class="card-text my-auto" v-if="todo.done">completed</span>
						<span class="card-text my-auto" v-if="!todo.done">in Progress</span>
					</div>
					<div class="card-body">
						<h2 class="card-title">{{ todo.todo }}</h2>
                        <div v-if="todo.list.length > 0">
                            <p class="card-text mb-2 mt-3 border-bottom px-3 fw-bold py-1">Todo List Item</p>
                            <p class="card-text my-1 px-2 py-1" v-for="item, index in todo.list" :key="index">
                                <span class="fa fa-star pe-1"></span>
                                {{ item }}
                            </p>
                        </div>
                        <p class="card-text my-3 text-success fw-bold" v-if="!todo.done">Todo still in Progress</p>
                        <p class="card-text my-3 text-secondary fw-bold" v-if="todo.done">Todo has been completed</p>
						<div class="d-flex justify-content-between mt-1">
							<p class="my-auto fw-light text-sm">Todo Date: {{ todo.todo_date }}</p>
							<p class="my-auto text-sm" v-if="todo.due_date">Due Date: {{ todo.due_date }}</p>
						</div>
                        <div class="d-flex justify-content-between mt-1">
							<p class="my-auto fw-bold text-sm">Created: {{ todo.createdAt }}</p>
							<p class="my-auto fw-bold text-sm">Last Updated: {{ todo.updatedAt }}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="col py-3">
                <h3 class="border-bottom border-secondary border-2 border-opacity-75 mb-3 fw-bold pb-2">Todo Settings</h3>
                <div class="mb-4 border-start border-5 border-success border-opacity-50 ps-2" v-if="!todo.done">
                    <p class="my-1">When you completed this todo you can mark it as complete</p>
                    <button class="btn btn-sm btn-success opacity-75 px-3" @click="todo_complete">
                        <span class="fa fa-paper-plane pe-2"></span>
                        complete
                    </button>
                </div>
                <div class="mb-4 border-start border-5 border-primary border-opacity-50 ps-2">
                    <p class="my-1">Edit and update your todo with new information or add to the one that already exists</p>
                    <router-link class="btn btn-sm px-3 opacity-75 btn-primary" :to="{name: 'EditTodo', params: {id: todo.id}}">
                        <span class="fa fa-pen pe-2"></span>
                        edit todo
                    </router-link>
                </div>
                <div class="mb-4 border-start border-5 border-danger border-opacity-50 ps-2">
                    <p class="my-1">You can remove todo if you no longer need it to be on your todo list</p>
                    <button class="btn btn-sm btn-danger opacity-75 px-3" @click="todo_destroy">
                        <span class="fa fa-trash pe-2"></span>
                        Trash
                    </button>
                </div>
			</div>
		</div>
	</div>
</template>