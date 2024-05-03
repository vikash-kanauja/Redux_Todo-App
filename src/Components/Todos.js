import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../redux/TodoSlice';
import moment from 'moment';
import Navbar from './Navbar';
import TodoItem from './TodoItem';
import AddTodoModal from './AddTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import { FiPlusCircle } from "react-icons/fi";
const Todos = () => {
    const [showOrHideTodoModal, setShowOrHideTodoModal] = useState(false);
    const [showOrHideDeleteModal, setShowOrHideDeleteModal] = useState(false);
    const [todoInputText, setTodoInputText] = useState("");
    const [error, setError] = useState({
        inputError: false,
        dateError: false,
    });
    const [editTodoData, setEditTodoData] = useState(null);
    const [deleteTodoData, setDeleteTodoData] = useState(null);

    const [currentDateAndTime, setCurrentDateAndTime] = useState(
        moment().format("YYYY-MM-DDTHH:mm")
    );
    const [time, setTime] = useState(moment().format("YYYY-MM-DDTHH:mm"));
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todos.todoList);

    const openOrCloseAddPopupModal = () => {
        setShowOrHideTodoModal((prevState) => !prevState);
        setTime(moment().format("YYYY-MM-DDTHH:mm"));
        setTodoInputText("");
    };
    const openOrCloseDeletePopupModal = (todo) => {
        setDeleteTodoData(todo);
        setShowOrHideDeleteModal((prevState) => !prevState);
    };
    const handleInput = (e) => {
        const { name, value } = e.target;
        let newError = { ...error };
        if (name === "todoTitle") {
            setTodoInputText(value);
            newError.inputError = (value.trim() === "");
            setError(newError);
        } else if (name === "time") {
            setTime(value);
            const currentTime = moment();
            const selectedTime = moment(value);
            newError.dateError = selectedTime.isBefore(currentTime);
            setError(newError);
        }
    };
    const editTodoClick = (todo) => {
        openOrCloseAddPopupModal();
        setEditTodoData(todo);
        setTodoInputText(todo.task);
        setTime(todo.time);

    };

    const addOrUpdateTodo = () => {
        const currentTime = moment();
        const selectedTime = moment(time);
        if (selectedTime.isBefore(currentTime)) {
            setError({
                inputError: false,
                dateError: true,
            });
            return;
        } else {
            setError({
                inputError: false,
                dateError: true,
            });
        }
        if (todoInputText.trim() === "") {
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
        if (editTodoData) {
            setTime(moment().format("YYYY-MM-DDTHH:mm"));
            dispatch(editTodo({
                id: editTodoData.id,
                task: todoInputText,
                color: editTodoData.color,
                completed: editTodoData.completed,
                time: time
            }));
            setEditTodoData(null);
            setTodoInputText("");
            openOrCloseAddPopupModal();
        } else {
            dispatch(
                addTodo({
                    id: Date.now(),
                    task: todoInputText.trim(),
                    color: "green",
                    completed: false,
                    time: time
                }));
            setTodoInputText("");
            openOrCloseAddPopupModal();
            setTime(moment().format("YYYY-MM-DDTHH:mm"));
        }
    };
    useEffect(() => {
        setInterval(() => {
            setCurrentDateAndTime(moment().format("YYYY-MM-DDTHH:mm"));
        }, 1000);
    }, []);
    return (
        <div className="w-full mx-auto relative pb-10 px-3 border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6 mt-12 2xl:mt-15">
            <Navbar currentDateAndTime={currentDateAndTime} />
            <div className="flex justify-between items-center mt-2 mb-6">
                <h1 className="text-3xl font-bold">Today</h1>
                <div
                    className="text-3xl text-blue-500 cursor-pointer"
                    onClick={openOrCloseAddPopupModal}>
                    <FiPlusCircle />
                </div>
            </div>
            {todoList.length === 0 && <h1>Add Todo</h1>}
            {todoList.map((todo) => (
                <TodoItem key={todo.id} todo={todo}
                    openOrCloseAddPopupModal={openOrCloseAddPopupModal}
                    editTodoClick={editTodoClick}
                    openOrCloseDeletePopupModal={openOrCloseDeletePopupModal} />
            ))}
            <AddTodoModal showOrHideTodoModal={showOrHideTodoModal}
                openOrCloseAddPopupModal={openOrCloseAddPopupModal}
                time={time}
                error={error}
                todoInputText={todoInputText}
                handleInput={handleInput}
                addOrUpdateTodo={addOrUpdateTodo} />
            <DeleteTodoModal
                showOrHideDeleteModal={showOrHideDeleteModal}
                openOrCloseDeletePopupModal={openOrCloseDeletePopupModal}
                deleteTodoData={deleteTodoData}
            />
        </div>
    );
};

export default Todos;