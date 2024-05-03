import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/TodoSlice";

const DeleteTodoModal = ({ todo, setClose }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTodo(todo));
    setClose(false);
  };
  return (
    <div>
      <div className="absolute text-center mx-auto w-[80%] top-[30%] left-[10%] bg-white border-2 px-2 py-4 rounded ">
        <p className="text-2xl text-left w-[80%] mx-auto mb-6">Delete</p>
        <p className="text-base text-left w-[80%] mx-auto mb-6">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-between w-[80%] mx-auto text-lg">
          <button
            className="px-4 py-1 border rounde"
            onClick={() => setClose(false)}
          >
            {" "}
            Cancel
          </button>
          <button
            className="px-4 py-1 border rounded bg-red-500 text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodoModal;
