// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Login } from './screens/Login';
// import { TaskList } from './components/TaskList';
// import { useAuthStore } from './store/authStore';

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user, loading } = useAuthStore();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   return <>{children}</>;
// };

// export const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <TaskList />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Calendar,
  Search,
  Plus,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";
import { auth, db } from "./lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { format } from "date-fns";
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import TaskBoardSearchView from "./components/TaskBoardSearchView";
import TaskListSearchView from "./components/TaskListSearchView";
import TaskListViewEmptyState from "./components/TaskListViewEmptyState";
import TaskListView from "./components/TaskListView";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task" element={<EditTask />} />
        <Route path="/task-board-search" element={<TaskBoardSearchView />} />
        <Route path="/task-list-search" element={<TaskListSearchView />} />
        <Route path="/task-list-empty" element={<TaskListViewEmptyState />} />
        <Route path="/task-list" element={<TaskListView />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

// export default AppRoutes;

// export default App;

interface Task {
  id: string;
  title: string;
  dueDate: Timestamp;
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const q = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid)
        );
        onSnapshot(q, (snapshot) => {
          const taskData = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Task)
          );
          setTasks(taskData);
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !user) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTask,
        userId: user.uid,
        status: "TO-DO",
        dueDate: Timestamp.fromDate(new Date()),
        category: "Work",
        createdAt: Timestamp.now(),
      });
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ClipboardList className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-purple-600">TaskBuddy</h1>
            </div>
            <p className="text-gray-600">
              Streamline your workflow and track progress effortlessly with our
              all-in-one task management app.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg px-4 py-3 font-medium hover:bg-gray-800 transition-colors"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-purple-600">TaskBuddy</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || ""}
                alt={user.displayName || ""}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{user.displayName}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-800"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-600"
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("board")}
                className={`p-2 rounded ${
                  viewMode === "board"
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-600"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {["TO-DO", "IN-PROGRESS", "COMPLETED"].map((status) => (
              <div
                key={status}
                className={`p-4 rounded-lg ${
                  status === "TO-DO"
                    ? "bg-pink-50"
                    : status === "IN-PROGRESS"
                    ? "bg-blue-50"
                    : "bg-green-50"
                }`}
              >
                <h3 className="font-semibold mb-4">
                  {status} ({tasks.filter((t) => t.status === status).length})
                </h3>
                <div className="space-y-2">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-4 rounded-lg shadow"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(task.dueDate.toDate(), "MMM dd, yyyy")}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <AppRoutes /> */}
      </div>
    </div>
    </Router>
  );
}

export default App;
