import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';


export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}


interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
}


const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};


const API_URL = '/api/tasks';


export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const getTaskById = createAsyncThunk<Task, string>('tasks/getTaskById', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const addTask = createAsyncThunk<Task, Omit<Task, '_id'>>('tasks/addTask', async (newTask) => {
  const response = await axios.post(API_URL, newTask);
  return response.data;
});

export const updateTask = createAsyncThunk<Task, { id: string; updatedTask: Partial<Task> }>(
  'tasks/updateTask',
  async ({ id, updatedTask }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<string, string>('tasks/deleteTask', async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
  return taskId;
});


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch tasks';
      })
      .addCase(getTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
        state.selectedTask = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectSelectedTask = (state: RootState) => state.tasks.selectedTask;
