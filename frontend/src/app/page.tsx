'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTasks, selectTasks, deleteTask } from '../redux/slices/taskSlice';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  pending: 'bg-red-500 text-white', 
  'in-progress': 'bg-yellow-500 text-white',
  completed: 'bg-green-500 text-white',
};

export default function HomePage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const loading = useAppSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Task Manager</h1>
      <Link href="/tasks/new" className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-6">
        + Add New Task
      </Link>

      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="w-full max-w-3xl space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-gray-900 text-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left">
              <Link href={`/tasks/${task._id}`} className="text-xl font-semibold hover:text-blue-400">{task.title}</Link>
              <p className="text-gray-400">{task.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
                {task.status.replace('-', ' ')}
              </span>
              <Link href={`/tasks/edit/${task._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
                Edit
              </Link>
              <button onClick={() => dispatch(deleteTask(task._id))} className="bg-red-500 text-white px-3 py-1 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
