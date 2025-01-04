import React from "react";
import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, isCompleted: false });
    setTodo("");
  };
  return (
    <>
      <form onSubmit={add} className="flex">
        <input
          type="text"
          placeholder="Write Todo"
          className="w-full border border-black/10
        rounded-l-lg px-3 outline-none duration-150 bg-white/150 py-1.5"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1.5 rounded-r-lg hover:bg-blue-600 duration-150"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default TodoForm;
