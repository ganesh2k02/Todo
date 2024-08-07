import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const Update = ({ display, update, handleUpdate }) => {
  const [Input, setInput] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (update) {
      setInput({
        title: update.title,
        body: update.body,
      });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const submit = async () => {
    try {
      const response = await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, Input);
    
      handleUpdate(response.data.list);
      display("none");
      toast.success("Updating task successfully");
    } catch (error) {
      console.error("Error during Axios request:", error);
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h1>Update Your Task</h1>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        name="title"
        value={Input.title}
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        name="body"
        value={Input.body}
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          UPDATE
        </button>
        <button
          className="btn btn-danger my-4 mx-4"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
