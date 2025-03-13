'use client';

import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { addTask } from '../../../redux/slices/taskSlice';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Title and description are required!');
      return;
    }
    dispatch(addTask({ title, description, status: 'pending' }));
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <form onSubmit={handleSubmit} className="bg-black text-white max-w-lg w-full p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Create New Task</h1>

        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          className="border p-2 w-full mb-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          className="border p-2 w-full mb-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-600">
          Add Task
        </button>
      </form>
    </div>
  );
}
