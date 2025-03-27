import React from 'react';
import { Task } from '../types/task';
import { useTaskStore } from '../store/taskStore';

export const TaskList: React.FC = () => {
  const { tasks, loading, error } = useTaskStore();

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const todoTasks = tasks.filter((task) => task.status === 'TO-DO');
  const inProgressTasks = tasks.filter((task) => task.status === 'IN-PROGRESS');
  const completedTasks = tasks.filter((task) => task.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Todo ({todoTasks.length})</h2>
        {todoTasks.length === 0 ? (
          <div className="text-gray-500">No Tasks in To-Do</div>
        ) : (
          <div className="space-y-2">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">
          In Progress ({inProgressTasks.length})
        </h2>
        {inProgressTasks.length === 0 ? (
          <div className="text-gray-500">No Tasks in Progress</div>
        ) : (
          <div className="space-y-2">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Completed ({completedTasks.length})
        </h2>
        {completedTasks.length === 0 ? (
          <div className="text-gray-500">No Completed Tasks</div>
        ) : (
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{task.title}</h3>
        <span className="text-sm text-gray-500">{task.category}</span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{task.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
        <div className="flex items-center space-x-2">
          {task.attachments.length > 0 && (
            <span className="text-sm text-gray-500">
              {task.attachments.length} attachments
            </span>
          )}
        </div>
      </div>
    </div>
  );
};