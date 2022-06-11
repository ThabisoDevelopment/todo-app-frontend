<script setup>
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { onMounted, reactive } from 'vue';

const todos =  reactive({
	loading: false,
	data: []
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

const get_todos = async() => {
	try {
		const { data } = await axios.get("/todos")
		data.forEach(todo => {
			const todo_data = {
				...todo,
				todo_date: full_date(todo.todo_date),
				due_date: full_date(todo.due_date),
				createdAt: full_date(todo.createdAt)
			}
			todos.data.push(todo_data)
		})
		todos.loading = false
	} catch (error) {
        todos.loading = false
        const errorMessage = error.response? error.response.data :error
        notify({
            title: 'Error Getting Users Todos',
            type: 'error',
            text: errorMessage 
        })
	}
}
onMounted(()=> get_todos())


</script>

<template>
	
	<div class="container">
		<div class="row">
			<router-link class="col-md-8 text-decoration-none text-secondary" v-for="todo in todos.data" :key="todo._id" :to="{name: 'ShowTodo', params: { id: todo._id }}">				
				<div class="card my-3 border-0 shadow">
					<div class="card-header border-0 d-flex justify-content-between text-light text-sm" :class="{'bg-secondary': todo.done, 'bg-success': !todo.done}">
						<span class="my-auto">Todo Date: {{ todo.todo_date }}</span>
						<span class="card-text my-auto" v-if="todo.done">completed</span>
						<span class="card-text my-auto" v-if="!todo.done">in Progress</span>
					</div>
					<div class="card-body">
						<h2 class="card-title">{{ todo.todo }}</h2>
						<div class="d-flex justify-content-between mt-1">
							<p class="my-auto fw-bold text-sm">Created: {{ todo.createdAt }}</p>
							<p class="my-auto fw-bold text-sm" v-if="todo.due_date">Due: {{ todo.due_date }}</p>
						</div>
					</div>
				</div>

			</router-link>
			<div class="col">

			</div>
		</div>
	</div>
</template>
