import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,

    getTasks: async (taskId) => {
        set({ loading: true });
        try {
          const res = await axiosInstance.get(`/task/getTasksById/${taskId}`); 
          set({ tasks: res.data.data, loading: false }); 
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error(error.response?.data?.message || "Failed to fetch tasks");
          set({ loading: false });
        }
      },

      createTasks: async (data) => {
        try {
            const res = await axiosInstance.post("/task/createTask", data); 
            set((state) => ({
                tasks: [...state.tasks, res.data.data], 
            }));
            toast.success("Task created successfully");
        } catch (error) {
            console.error("Error creating tasks:", error);
            toast.error(error.response?.data?.message || "Failed to create tasks");
        }
      },

      
    updateTasks: async (taskId, data) => {
        try {
            const res = await axiosInstance.post(`/task/updateTask/${taskId}`, data); 
            set((state) => ({
                tasks: state.tasks.map((t) => (t._id === taskId ? res.data.data : t)), 
            }));
            toast.success("Task updated successfully");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error(error.response?.data?.message || "Failed to update task");
        }
    },


    deleteTasks: async (taskId) => {
        try {
            await axiosInstance.delete(`/task/deleteTask/${taskId}`); 
            set((state) => ({
                tasks: state.tasks.filter((t) => t._id !== taskId),
            }));
            toast.success("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
      },
}));