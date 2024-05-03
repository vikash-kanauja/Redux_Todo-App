import React from 'react';
import moment from 'moment';
const AddTodoModal = ({ showOrHideTodoModal, todoInputText, handleInput, openOrCloseAddPopupModal, addOrUpdateTodo, time, error }) => {
  const dateTimePickerMinValue = moment().format("YYYY-MM-DDTHH:mm");
  return (
    <div>
      {showOrHideTodoModal && (
        <div className="absolute mx-auto w-11/12 top-[15%] left-[4%] bg-white border-2 p-2 rounded ">
          <textarea
            name="todoTitle"
            id="todoTitle"
            value={todoInputText}
            onChange={handleInput}
            className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${error.inputError ? "border-red-500" : "border-gray-200"}`}
          ></textarea>
          <input
            type="datetime-local"
            name="time"
            id="time"
            value={time}
            min={dateTimePickerMinValue}
            onChange={handleInput}
            className={`w-full rounded p-2 border-2 cursor-pointer ${error.dateError ? "border-red-500" : "border-gray-200"}
               2xl:mt-2 focus:outline-none`} />
          <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4">
            <button onClick={openOrCloseAddPopupModal}>Cancel</button>
            <button onClick={addOrUpdateTodo}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTodoModal;