import { useEffect, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore.js"
import { z } from "zod";
import { Circle, Plus, Pen, Trash2, CheckCircle2, Clock } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js"

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export default function TaskPage() {
  const { 
    createTasks, 
    loading, 
    tasks, 
    getTasks, 
    updateTasks, 
    deleteTasks 
  } = useTaskStore();
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("TODO")
  const [error, setError] = useState("");

  const { user } = useAuthStore()  

  useEffect(() => {
    getTasks();
  }, [getTasks])

  const handleAddTasks = async (e) => {
    e.preventDefault();
    setError("")

    const formData = {
      title,
      description,
      status  
    }

    const result = createTaskSchema.safeParse(formData)    
    if(!result.success){
      setError(result.error.errors[0].message)
      return
    }

    await createTasks(result.data)
    setTitle("")
    setDescription("")
    setStatus("TODO")
  }

  const activeTasks = tasks.filter((task) => task.status !== "DONE")
  const completedTasks = tasks.filter((task) => task.status === "DONE")

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            My Tasks
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Stay organized and productive
          </p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100">
          <form onSubmit={handleAddTasks} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Input */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Status Selector */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 bg-white"
                >
                  <option value="TODO">📋 To Do</option>
                  <option value="IN_PROGRESS">⚡ In Progress</option>
                  <option value="DONE">✅ Done</option>
                </select>
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a detailed description..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 text-center transform transition duration-200 hover:scale-105">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
              {activeTasks.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Active</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 text-center transform transition duration-200 hover:scale-105">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
              {completedTasks.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Completed</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 text-center transform transition duration-200 hover:scale-105">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">
              {tasks.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Total</div>
          </div>
        </div>

        {/* Active Tasks Section */}
        {activeTasks.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Active Tasks
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {activeTasks.map((task) => (
                <TasksItem
                  key={task._id}
                  task={task}
                  onUpdate={updateTasks}
                  onDelete={deleteTasks}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              Completed Tasks
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {completedTasks.map((task) => (
                <TasksItem
                  key={task._id}
                  task={task}
                  onUpdate={updateTasks}
                  onDelete={deleteTasks}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 sm:p-16 text-center border border-gray-100">
            <Circle className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Add your first task to get started on your productivity journey!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function TasksItem({task, onUpdate, onDelete}){
  const getStatusColor = (status) => {
    switch(status) {
      case "DONE":
        return "bg-green-100 border-green-300";
      case "IN_PROGRESS":
        return "bg-yellow-100 border-yellow-300";
      default:
        return "bg-blue-100 border-blue-300";
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case "DONE":
        return "bg-green-500";
      case "IN_PROGRESS":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  }

  const getButtonText = (status) => {
    switch(status) {
      case "TODO":
        return "Start";
      case "IN_PROGRESS":
        return "Complete";
      default:
        return "Restart";
    }
  }

  return (
    <div className={`${getStatusColor(task.status)} border-2 rounded-xl p-4 sm:p-6 shadow-lg transition duration-300 hover:shadow-2xl transform hover:-translate-y-1`}>
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {task.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-3 line-clamp-3">
          {task.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Status:
          </span>
          <span className={`${getStatusBadge(task.status)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button 
          onClick={() => onUpdate(task._id, { 
            status: task.status === "TODO" ? "IN_PROGRESS" : task.status === "IN_PROGRESS" ? "DONE" : "TODO"
          })}
          className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          <Pen className="w-4 h-4" />
          <span className="text-sm">{getButtonText(task.status)}</span>
        </button>
        
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 sm:flex-none px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Delete</span>
        </button>
      </div>
    </div>
  )
}