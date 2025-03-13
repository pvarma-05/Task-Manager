'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getTaskById, updateTask, selectSelectedTask } from '../../../../redux/slices/taskSlice';
import { useRouter, useParams } from 'next/navigation';
import type { Task } from '../../../../redux/slices/taskSlice';

export default function EditTaskPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const task = useAppSelector(selectSelectedTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('pending');

  useEffect(() => {
    if (params?.id) {
      dispatch(getTaskById(params.id as string));
    }
  }, [dispatch, params?.id]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status as Task['status']);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Title and description are required!');
      return;
    }
    dispatch(updateTask({ id: params.id as string, updatedTask: { title, description, status } }));
    router.push('/');
  };

  if (!task) return <p className="text-gray-400 text-center">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <form onSubmit={handleSubmit} className="bg-black text-white max-w-lg w-full p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
        
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          className="border p-2 w-full mb-3 rounded-md bg-gray-800 text-white"
        />

        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          className="border p-2 w-full mb-3 rounded-md bg-gray-800 text-white"
        />

        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as Task['status'])} 
          className="border p-2 w-full mb-3 rounded-md bg-gray-800 text-white"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">
          Update Task
        </button>
      </form>
    </div>
  );
}
