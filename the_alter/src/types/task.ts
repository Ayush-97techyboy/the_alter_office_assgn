export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED';
  category: 'WORK' | 'PERSONAL';
  dueDate: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TaskActivity {
  id: string;
  taskId: string;
  type: 'CREATED' | 'UPDATED' | 'STATUS_CHANGED' | 'FILE_UPLOADED';
  timestamp: string;
  details: string;
}