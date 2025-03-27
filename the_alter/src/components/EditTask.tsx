import React from 'react';

const EditTask: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <form className="mt-4">
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter task name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTask;