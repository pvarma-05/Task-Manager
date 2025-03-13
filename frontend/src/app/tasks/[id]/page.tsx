'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getTaskById, selectSelectedTask } from '../../../redux/slices/taskSlice';
import { useRouter, useParams } from 'next/navigation';

export default function TaskDetailPage() {
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectSelectedTask);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      dispatch(getTaskById(params.id as string));
    }
  }, [dispatch, params?.id]);

  if (!task) return <p className="text-gray-400 text-center">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-black text-white max-w-lg w-full p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
        <p className="text-lg text-gray-300">{task.description}</p>
        <p className="text-gray-400 mt-2">Status: <strong className="capitalize">{task.status}</strong></p>
        <button onClick={() => router.push(`/tasks/edit/${task._id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 w-full">
          Edit Task
        </button>
      </div>
    </div>
  );
}
