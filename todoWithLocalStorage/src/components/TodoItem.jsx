import React from "react";
import { useState } from "react";
import { useTodo } from "../context";
const TodoItem = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todomsg, setTodomsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todomsg });
    setIsEditable(false);
  };

  const toggleTodoHandler = () => {
    toggleTodo(todo.id);
  };
  return (
    <>
      <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
          todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleTodoHandler}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isEditable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
          value={todomsg}
          onChange={(e) => setTodomsg(e.target.value)}
          readOnly={!isEditable}
        />
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todo.completed) return;

            if (isEditable) {
              editTodo();
            } else toggleTodoHandler((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌
        </button>
      </div>
    </>
  );
};

export default TodoItem;
