import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import moment from "moment";
import Navbar from "./Navbar";
import TodoItem from "./TodoItem";
import AddTodoModal from "./AddTodoModal";
import { useSelector } from "react-redux";

const Todos = () => {
  const todoList = useSelector((state) => state.todos.todoList);
  const [showOrHideTodoModal, setShowOrHideTodoModal] = useState(false);
  const [currentDateAndTime, setCurrentDateAndTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateAndTime(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval
  }, []);

  const toggleTodoModal = () => {
    setShowOrHideTodoModal((prev) => !prev);
  };

  return (
    <div className="w-full mx-auto relative pb-10 px-3 border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6 mt-12 2xl:mt-15">
      <Navbar currentDateAndTime={currentDateAndTime} />
      <div className="flex justify-between items-center mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={toggleTodoModal}
        >
          <FiPlusCircle />
        </div>
      </div>
      {todoList.length === 0 && <h1>Add Todo</h1>}
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {showOrHideTodoModal && (
        <AddTodoModal openOrCloseAddPopupModal={toggleTodoModal} />
      )}
    </div>
  );
};

export default Todos;
