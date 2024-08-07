import React, { useEffect, useState, useCallback } from "react";
import "./Todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

let id = sessionStorage.getItem("id");

const Todo = () => {
  const [Input, setInput] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const [toUpdateArray, setToUpdateArray] = useState(null);

  const showTextarea = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const submit = useCallback(async () => {
    if (Input.title === "" || Input.body === "") {
      toast.error("Title or Body Should Not Be Empty");
    } else {
      if (id) {
        await axios
          .post(`${window.location.origin}/api/v2/addTask`, {
            title: Input.title,
            body: Input.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
            setArray((prev) => [...prev, response.data.list]);
          });

        setInput({ title: "", body: "" });
        toast.success("Your Task is added");
      } else {
        setArray([...Array, Input]);
        setInput({ title: "", body: "" });
        toast.success("Your Task is Not Saved! Please Signup");
      }
    }
  }, [Input, Array]);

  const del = async (Id) => {
    if (id) {
      await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Id}`);
      const updatedArray = Array.filter((task) => task._id !== Id);
      setArray(updatedArray);
      toast.success("Task deleted successfully.");
    } else {
      toast.error("Please Signup First");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    setToUpdateArray(Array[value]);
  };

  const handleUpdate = (updatedTask) => {
    const updatedArray = Array.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setArray(updatedArray);
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          const response = await axios.get(`${window.location.origin}/api/v2/getTask/${id}`);
          setArray(response.data.tasks);
        } catch (error) {
          toast.error("Error fetching tasks.");
        }
      };
      fetch();
    }
  }, []);

  return (
    <div className="todo">
      <ToastContainer />
      <div className="container todo-main d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex flex-column todo-inputs-div w-100 p-1">
          <input
            type="text"
            placeholder="TITLE"
            className="my-2 p-2 todo-inputs"
            onClick={showTextarea}
            name="title"
            value={Input.title}
            onChange={change}
          />
          <textarea
            id="textarea"
            type="text"
            placeholder="BODY"
            className="p-2 todo-inputs"
            name="body"
            value={Input.body}
            onChange={change}
            style={{ display: "none" }}
          />
        </div>
        <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
          <button className="todo-btn px-2 py-1" onClick={submit}>
            ADD
          </button>
        </div>
      </div>
      <div className="todo-body">
        <div className="container-fluid">
          <div className="row">
            {Array.map((item, index) => (
              <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                <TodoCard
                  title={item.title}
                  body={item.body}
                  id={item._id}
                  delid={del}
                  display={dis}
                  updateId={index}
                  toBeUpdate={update}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="todo-update" id="todo-update">
        <div className="Container update">
          <Update display={dis} update={toUpdateArray} handleUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
