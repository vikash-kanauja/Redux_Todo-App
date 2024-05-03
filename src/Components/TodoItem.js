import React, { useState } from "react";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BiAlarm } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { taskComplete } from "../redux/TodoSlice";
import AddTodoModal from "./AddTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteTodo, SetDeleteTodo] = useState(false);
  const TodoCompleteTask = () => {
    dispatch(taskComplete(todo));
  };
  return (
    <div>
      <div className="flex justify-between py-4 border-b w-[100%]">
        <div className="flex items-center gap-2 w-[80%]">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={TodoCompleteTask}
            className="cursor-pointer"
          />
          <div className="text-base break-words w-[70%] pl-2">
            <p className="text-lg font-semibold ">{todo.task}</p>
            <p className="flex items-center text-gray-400 text-xs">
              <BiAlarm />
              {moment(todo.time).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 w-[21%]">
          <div
            className={`rounded-full dot w-3 h-3 ${
              todo.completed
                ? "bg-green-500"
                : moment(todo.time).isBefore(moment(), "minute")
                ? "bg-red-500"
                : "bg-purple-500"
            }`}
          ></div>
          <div
            className="cursor-pointer"
            onClick={() => SetDeleteTodo((prev) => !prev)}
          >
            <MdDelete className="text-red-500" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>
      {open && <AddTodoModal todo={todo} setClose={setOpen} />}
      {deleteTodo && <DeleteTodoModal todo={todo} setClose={SetDeleteTodo} />}
    </div>
  );
};

export default TodoItem;
