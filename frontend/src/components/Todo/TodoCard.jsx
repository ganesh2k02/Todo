import React from "react";
import "./Todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCard = ({ title, body, id, delid, display,updateId,toBeUpdate }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h1>{title}</h1>
        <p className="todo-card-p">{body.substring(0, 77)}...</p>
      </div>

      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
        onClick={() => {
          display("block");
          toBeUpdate(updateId);
        }}
        >
          <GrDocumentUpdate className="card-icon" />
          Update
        </div>

        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => delid(id)}
        >
          <AiFillDelete className="card-icon del" />
          Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
