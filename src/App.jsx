import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(""); // single task / one todo
  const [todos, setTodos] = useState([]); //an array of all todos
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    // to bring the selected todo to input field
    setTodo(t[0].todo);

    // to delete the selected todo from the list same delete function
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

    // save
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        todo,
        isCompleted: false,
        id: uuidv4(),
      },
    ]);

    setTodo("");
    console.log(todos);

    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos);

    saveToLS();
  };

  const toggleFinish = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-200  shadow-[0_18px_35px_rgba(0,0,0,0.45)] md:w-1/2 min-h-[80vh]">
        <h1 className="font-bold text-center text-2xl font-serif flex items-center justify-center gap-x-5 gap-y-2">
          {" "}
          <LuListTodo />
          iTask - Manage all your tasks at one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold ">Add Todos</h2>

          <div className="flex gap-x-5">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="w-[85%] bg-white h-10 rounded-lg  px-5 py-1 outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 2}
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 py-1 px-3 text-white rounded-md  font-bold transition-all cursor-pointer  flex items-center justify-center gap-x-2"
            >
              Save <MdOutlineAddTask />
            </button>
          </div>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toggleFinish} /> <span className="mx-2">Show Finished Tasks</span>
        <h2 className="text-lg font-bold my-3 ">Your To-Dos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="mx-5"> No To-Dos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full md:w-[80%] justify-between m-2"
                >
                  <div className="flex gap-5 items-center">
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckboxChange}
                      checked={item.isCompleted}
                      id=""
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "line-through font-serif "
                          : " font-serif "
                      }
                    >
                      {" "}
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 py-1 px-3 text-white rounded-md mx-1 font-bold transition-all cursor-pointer "
                    >
                      <MdEditNote />
                    </button>

                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 py-1 px-3 text-white rounded-md mx-1 font-bold transition-all cursor-pointer"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="italic text-center my-2 text-gray-600 font-mono">
        Crafted with <span class="text-2xl text-gray-500">&hearts;</span> by
        Ashfaq
      </div>
    </>
  );
}

export default App;

// why spread operator and rerendering
// // whyyyyyyyy
//     let newTodos = todos.filter(item =>{
//       return item.id !== id;
//     })

// handle an empty todo input case

// ask for conformation before deleting a todo
// ⚠️ BONUS: localStorage bug (important)

// You are calling saveToLS() right after setTodos(), but state updates are async.

// ❌ This saves OLD data
// setTodos(newTodos);
// saveToLS();

// ✅ Best fix: auto-save with useEffect
// useEffect(() => {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }, [todos]);

// 🧹 Then REMOVE saveToLS() from:

// handleAdd

// handleEdit

// handleDelete

// handleCheckboxChange

//whats md and ewxp;lain , and why long todos are getting siaaapeared when refreshed

//why del is not working after ediitng a todo
