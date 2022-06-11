<script setup>
import { reactive } from 'vue';

const todo = reactive({
    todo: '',
    list_item: ''
})

</script>
<template>
<!-- Modal -->
    <div class="modal fade" id="createTodostaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createStaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down">
            <div class="modal-content border-0">
                <div class="modal-header">
                <h5 class="modal-title fw-bold" id="createStaticBackdropLabel">Create New Todo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="#" method="post">
                    <div class="mb-3">
                        <label for="todo" class="form-label">Your Todo</label>
                        <textarea type="text" id="todo" class="form-control bg-light" v-model="todo.todo" placeholder="write your todo here..."></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="todo" class="form-label">List of todos item</label>
                        <div class="input-group">
                            <input type="text" class="form-control bg-light" aria-describedby="todoList" v-model="todo.list_item">
                            <button class="btn btn-secondary" type="button" id="todoList">add</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>