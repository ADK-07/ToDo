import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: task.trim(), completed: false },
    ]);
    setTask("");
  };

  const removeTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="shadow-xl rounded-lg px-8 py-6 w-full max-w-md bg-gradient-to-r from-gray-900 to-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">To-Do List</h1>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex items-center bg-white rounded-full overflow-hidden mb-4"
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 transition text-white px-5 py-2 font-semibold"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        {todos.length === 0 ? (
          <p className="text-gray-300">No tasks added yet.</p>
        ) : (
          <>
            <ul className="flex flex-col gap-2 text-left max-h-60 overflow-y-auto pr-1">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="h-5 w-5 cursor-pointer"
                  />
                  <span
                    className={`flex-1 text-lg ${
                      t.completed
                        ? "line-through text-gray-400"
                        : "text-gray-200"
                    }`}
                  >
                    {t.text}
                  </span>
                  <button
                    onClick={() => removeTask(t.id)}
                    aria-label="Delete Task"
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Clear Completed Button */}
            <button
              onClick={clearCompleted}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              Clear Completed
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
