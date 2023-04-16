import React, { useEffect, useState } from "react";
import {
  ActivityItemDeleteButtonIcon,
  TodoEditButtonIcon,
  TodoItemChecked,
  TodoItemUnchecked,
} from "../../../assets";
import { updateTodoById } from "../../../api/todo";

export default function TodoCard({
  onOpenEditModal,
  onOpenDeleteModal,
  id,
  title,
  priority,
  is_active,
}) {
  const [isChecked, setIsChecked] = useState(false);

  function convertPriorityToColor(priority) {
    if (priority === "very-high") {
      return "#ED4C5C";
    } else if (priority === "high") {
      return "#FFCE31";
    } else if (priority === "normal") {
      return "#00A790";
    } else if (priority === "low") {
      return "#43C4E3";
    } else {
      return "#B01AFF";
    }
  }

  useEffect(() => {
    if (!is_active) {
      setIsChecked(true);
    }
  }, [is_active]);

  return (
    <div className="todo-card">
      <div className="todo-card__section1">
        <button
          data-cy="todo-item-checkbox"
          className="todo-checkbox"
          onClick={() => {
            updateTodoById({ id, is_active: Number(isChecked) });
            setIsChecked((prev) => !prev);
          }}
        >
          <img
            src={isChecked ? TodoItemChecked : TodoItemUnchecked}
            alt="todo-checkbox"
          />
        </button>
        <div
          className="circle"
          style={{ backgroundColor: convertPriorityToColor(priority) }}
        />
        <p
          className="todo-title"
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          {title}
        </p>
        <button className="todo-edit-button" onClick={onOpenEditModal}>
          <img src={TodoEditButtonIcon} alt="todo-edit-button" />
        </button>
      </div>

      <div className="todo-card__section2">
        <button
          data-cy="todo-item-delete-button"
          className="todo-delete-button"
          onClick={onOpenDeleteModal}
        >
          <img src={ActivityItemDeleteButtonIcon} alt="todo-delete-button" />
        </button>
      </div>
    </div>
  );
}
