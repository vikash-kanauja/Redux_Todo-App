import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { addTodo, editTodo } from "../redux/TodoSlice";
import { useDispatch } from "react-redux";
const AddTodoModal = ({ openOrCloseAddPopupModal, todo, setClose }) => {
  const [todoInputText, setTodoInputText] = useState("");
  const [time, setTime] = useState(moment().format("YYYY-MM-DDTHH:mm"));
  const [error, setError] = useState({ inputError: false, dateError: false });
  const dateTimePickerMinValue = moment().format("YYYY-MM-DDTHH:mm");
  const dispatch = useDispatch();
  const addOrUpdateTodo = () => {
    if (todo !== undefined) {
      setTime(moment().format("YYYY-MM-DDTHH:mm"));
      dispatch(
        editTodo({
          id: todo.id,
          task: todoInputText,
          color: todo.color,
          completed: todo.completed,
          time: time,
        })
      );
      setTodoInputText("");
      setClose();
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          task: todoInputText.trim(),
          color: "green",
          completed: false,
          time: time,
        })
      );
      setTodoInputText("");
      openOrCloseAddPopupModal(false);
      setTime(moment().format("YYYY-MM-DDTHH:mm"));
    }
  };
  console.log(todo)

    useEffect(() => {
      if (todo !== undefined) {
        setTodoInputText(todo.task);
        setTime(todo.time);
      }
    }, []);
  const handleInput = (e) => {
    const { name, value } = e.target;
    let newError = { ...error };
    if (name === "todoTitle") {
      setTodoInputText(value);
      newError.inputError = value.trim() === "";
      setError(newError);
    } else if (name === "time") {
      setTime(value);
      const selectedTime = moment(value);
      newError.dateError = selectedTime.isBefore(dateTimePickerMinValue);
      setError(newError);
    }
  };

  const handleAddOrUpdateTodo = () => {
    if (
      moment(time).isSameOrBefore(dateTimePickerMinValue, "minute") &&
      todoInputText.trim() === ""
    ) {
      setError({
        inputError: true,
        dateError: true,
      });
      return;
    }
    if (moment(time).isSameOrBefore(dateTimePickerMinValue)) {
      setError({
        inputError: false,
        dateError: true,
      });
      return;
    } else if (todoInputText.trim() === "") {
      setError({
        inputError: true,
        dateError: false,
      });
      return;
    } else {
      setError({
        inputError: false,
        dateError: false,
      });
    }
    addOrUpdateTodo();
  };

  return (
    <div>
      <div className="absolute mx-auto w-11/12 top-[15%] left-[4%] bg-white border-2 p-2 rounded ">
        <textarea
          name="todoTitle"
          id="todoTitle"
          value={todoInputText}
          onChange={handleInput}
          className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${
            error.inputError ? "border-red-500" : "border-gray-200"
          }`}
        ></textarea>
        <input
          type="datetime-local"
          name="time"
          id="time"
          value={time}
          min={dateTimePickerMinValue}
          onChange={handleInput}
          className={`w-full rounded p-2 border-2 cursor-pointer ${
            error.dateError ? "border-red-500" : "border-gray-200"
          }
               2xl:mt-2 focus:outline-none`}
        />
        <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4">
          <button
            onClick={() => {
              if (todo !== undefined) {
                setClose(false);
              } else {
                openOrCloseAddPopupModal();
              }
            }}
          >
            Cancel
          </button>
          <button onClick={handleAddOrUpdateTodo}>
            {todo !== undefined ? "Update" : "Add "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
