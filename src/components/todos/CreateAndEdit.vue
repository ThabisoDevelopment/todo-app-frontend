<script setup>
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const todo =  reactive({
	edit: false,
	loading: false,
	error: null,
	new_list_item: '',
    id: null,
	todo: '',
    list: [],
    todo_date: Date,
    due_date: Date,
})

const transaction_date = data => {
	const DD = new Date(data)
	const year = DD.getFullYear()
	const month = ("0" + (DD.getMonth() + 1)).slice(-2)
	const day_of_month = ("0" + DD.getDate()).slice(-2)
	const time = `T${DD.getHours()}:${DD.getMinutes()}`
	return `${year}-${month}-${day_of_month}${time}`
}

const route = useRoute()
const router = useRouter()
const get_edit_todo = async(id) => {
	try {
		todo.edit = true
		const { data } = await axios.get(`/todos/${route.params.id}`)
		todo.todo = data.todo
        todo.todo_date = transaction_date(data.todo_date)
        todo.due_date = transaction_date(data.due_date)
        data.list.forEach(item => todo.list.push(item))
		todo.loading = false
	} catch (error) {
        todo.loading = false
		router.back()
        const errorMessage = error.response? error.response.data :error
        notify({
            title: 'Error Getting User Todo',
            type: 'error',
            text: errorMessage 
        })
	}
}
onMounted(() => route.name == 'EditTodo'? get_edit_todo(route.params.id): null)

const remove_list_item = index => todo.list.splice(index, 1)
const add_list_item = () => {
	if (!todo.new_list_item) return notify({
		title: 'Error Todo List',
		type: 'error',
		text: 'Soory! the todo list item is empty, write something'
	})
	todo.list.push(todo.new_list_item)
	todo.new_list_item = ''
}

const submit_todo = async() => {
	try {
		if (!todo.todo || todo.todo == '') throw 'Sorry! the todo title is required'
		todo.loading = true
		const inputData = {
			todo: todo.todo,
			list: todo.list,
			todo_date: todo.todo_date,
			due_date: todo.due_date? todo.due_date: Date
		}
		if (todo.edit) {
			await axios.put(`/todos/${route.params.id}`, inputData)
			router.push({ name: 'ShowTodo', params: { id: route.params.id }})
			notify({
				title: 'Success Submit User Todo',
				type: 'successs',
				text: 'Current todo has been updated successfuly' 
			})
		}
		if (!todo.edit) {
			const { data } = await axios.post('/todos', inputData)
			router.push({ name: 'ShowTodo', params: { id: data._id }})
			notify({
				title: 'Success Submit User Todo',
				type: 'successs',
				text: 'New todo has been created successfuly' 
			})
		}
	} catch (error) {
        const errorMessage = error.response? error.response.data :error
		todo.loading = false
		todo.error = errorMessage
        notify({
            title: 'Error Submit User Todo',
            type: 'error',
            text: errorMessage 
        })
	}
}
</script>

<template>
	<div class="container">
        <div class="row justify-content-center">
			<div class="col-md-9 py-3 mb-5">				
				<div class="card border-0 shadow">
					<div class="card-header border-0 opacity-75" :class="{'bg-success': todo.edit, 'bg-primary': !todo.edit}">
						<h1 class="h3 text-light my-auto py-1 text-center" v-if="!todo.edit">Create new Todo</h1>
						<h1 class="h3 text-light my-auto py-1 text-center" v-if="todo.edit">Edit Current Todo</h1>
					</div>
					<div class="card-body">
						<form action="#" method="post" @submit.prevent="submit_todo">
							<div class="mb-4">
								<label for="todo" class="form-label">Your Todo</label>
								<textarea type="text" id="todo" class="form-control bg-light" v-model="todo.todo" placeholder="write your todo here..."></textarea>
							</div>
							<div class="mb-4">
								<label for="todo" class="form-label">Todo List</label>
								<ul class="list-group list-group-flush" v-for="item, index in todo.list" :key="index">
									<li class="list-group-item text-secondary border-bottom d-flex justify-content-between align-items-start">
										<div class="my-auto">
											<span class="fa fa-star pe-1"></span>
											{{ item }}
										</div>
										<button type="button" class="btn btn-sm btn-outline-danger border-0" @click="remove_list_item(index)"><span class="fa fa-times"></span></button>
									</li>
								</ul>
								<div class="input-group">
									<input type="text" class="form-control bg-light py-2" placeholder="eg: going to the gym" v-model="todo.new_list_item">
									<button class="btn btn-primary px-4" type="button" @click="add_list_item">add</button>
								</div>
							</div>
							<div class="row mb-4">
								<div class="col-md-6 mb-3">
									<label for="todo-datetime-local" class="form-label">Todo Date</label>
									<input type="datetime-local" class="form-control bg-light" id="todo-datetime-local" v-model="todo.todo_date">
								</div>
								<div class="col-md-6 mb-3">
									<label for="due-datetime-local" class="form-label">Due Date <span class="text-sm text-success fw-bold">- optional</span></label>
									<input type="datetime-local" class="form-control bg-light" id="due-datetime-local" v-model="todo.due_date">
								</div>
							</div>
							<div class="row justify-content-center">
								<button class="col-8 col-md-5 btn" type="submit" :disabled="todo.loading" :class="{'btn-success': todo.edit, 'btn-primary': !todo.edit}">
									Submit
									<span v-if="!todo.loading" class="fa fa-paper-plane ps-2"></span>
									<span v-if="todo.loading" class="spinner-grow spinner-grow-sm ms-2" role="status" aria-hidden="true"></span>
								</button>
							</div>
							<p class="text-danger text-center mb-0 fw-bold mt-4" v-if="todo.error">{{ todo.error }}</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>