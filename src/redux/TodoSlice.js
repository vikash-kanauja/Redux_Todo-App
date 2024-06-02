import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  todoList: [],
};
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
    },
    taskComplete: (state, action) => {
      const todo = state.todoList.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, task, time } = action.payload;
      const todoIndex = state.todoList.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.todoList[todoIndex] = { ...state.todoList[todoIndex], task, time };
      }
    },
  },
});

export const { addTodo, deleteTodo, taskComplete, editTodo } = todoSlice.actions;
export default todoSlice.reducer;