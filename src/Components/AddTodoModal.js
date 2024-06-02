import React, { useEffect, useState } from "react";
import moment from "moment";
import { addTodo, editTodo } from "../redux/TodoSlice";
import { useDispatch } from "react-redux";

const AddTodoModal = ({ openOrCloseTodoModal , todo,setEditTodoData }) => {

  const [todoInputData, setTodoInputData] = useState({
    todoInputText: "",
    time: moment().format("YYYY-MM-DDTHH:mm")
  });

  const [error, setError] = useState({ inputError: false, dateError: false });
  const dateTimePickerMinValue = moment().format("YYYY-MM-DDTHH:mm");
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setTodoInputData({
        todoInputText: todo.task,
        time: todo.time
      });
    }
  }, [todo]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    let newError = { ...error };
    if (name === "todoTitle") {
      setTodoInputData(prevState => ({
        ...prevState,
        todoInputText: value
      }));
      newError.inputError = value.trim() === "";
    } else if (name === "time") {
      setTodoInputData(prevState => ({
        ...prevState,
        time: value
      }));
      const selectedTime = moment(value);
      newError.dateError = selectedTime.isBefore(dateTimePickerMinValue);
    }
    setError(newError);
  };

  const handleAddOrUpdateTodo = () => {
    if (
      moment(todoInputData.time).isSameOrBefore(dateTimePickerMinValue, "minute") &&
      todoInputData.todoInputText.trim() === ""
    ) {
      setError({
        inputError: true,
        dateError: true,
      });
      return;
    }
    if (moment(todoInputData.time).isSameOrBefore(dateTimePickerMinValue)) {
      setError({
        inputError: false,
        dateError: true,
      });
      return;
    } else if (todoInputData.todoInputText.trim() === "") {
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

    if (todo) {
      dispatch(
        editTodo({
          id: todo.id,
          task: todoInputData.todoInputText,
          color: todo.color,
          completed: todo.completed,
          time: todoInputData.time,
        })
      );
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          task: todoInputData.todoInputText.trim(),
          color: "green",
          completed: false,
          time: todoInputData.time,
        })
      );
    }
    setEditTodoData(null)
    openOrCloseTodoModal();
    setTodoInputData({
      todoInputText: "",
      time: moment().format("YYYY-MM-DDTHH:mm")
    });
  };

  return (
    <div>
      <div className="absolute mx-auto w-11/12 top-[15%] left-[4%] bg-white border-2 p-2 rounded ">
        <textarea
          name="todoTitle"
          id="todoTitle"
          value={todoInputData.todoInputText}
          onChange={handleInput}
          className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${error.inputError ? "border-red-500" : "border-gray-200"
            }`}
        ></textarea>
        <input
          type="datetime-local"
          name="time"
          id="time"
          value={todoInputData.time}
          min={dateTimePickerMinValue}
          onChange={handleInput}
          className={`w-full rounded p-2 border-2 cursor-pointer ${error.dateError ? "border-red-500" : "border-gray-200"
            } 2xl:mt-2 focus:outline-none`}
        />
        <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4">
          <button onClick={openOrCloseTodoModal}>
            Cancel
          </button>
          <button onClick={handleAddOrUpdateTodo}>
            {todo ? "Update" : "Add "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
