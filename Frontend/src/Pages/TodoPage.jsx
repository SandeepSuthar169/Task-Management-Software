import { useEffect, useState } from "react";
import { z } from "zod";
import { useTodoStore } from "../store/useTodoStore";

const todoSchema = z.object({
  text: z.string().min(1, "Todo text is required"),
  completed: z.boolean().optional(),
});

export default function TodoApp() {
  const { todos, getTodos, createTodo, updateTodo, deleteTodo, loading } =
    useTodoStore();

  const [text, setText] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const handleAdd = async () => {
    const parsed = todoSchema.safeParse({ text });
    if (!parsed.success) {
      alert(parsed.error.issues[0].message);
      return;
    }
    await createTodo({ text, completed: false });
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter todo"
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      updateTodo(todo._id, {
                        completed: !todo.completed,
                      })
                    }
                  />
                  <span
                    className={
                      todo.completed ? "line-through text-gray-400" : ""
                    }
                  >
                    {todo.text}
                  </span>
                </label>

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}