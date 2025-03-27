import React from 'react';

const TaskListViewEmptyState: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Task List View - Empty State</h1>
      <p>No tasks available.</p>
    </div>
  );
};

export default TaskListViewEmptyState;