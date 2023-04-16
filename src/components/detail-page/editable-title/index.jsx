import React, { useEffect, useRef, useState } from "react";
import { TodoEditButtonIcon } from "../../../assets";
import { useParams } from "react-router-dom";

export default function EditableTitle({ value, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const ref = useRef();
  const { id } = useParams();

  useEffect(() => {
    if (value) {
      setTitle(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onSave({ id, title: ref.current.value });
        setEditMode(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      {editMode ? (
        <input
          className="title-input"
          ref={ref}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        <h1 className="readonly-title" onClick={() => setEditMode(true)}>
          {title}
        </h1>
      )}

      <img
        src={TodoEditButtonIcon}
        alt="edit-button"
        className="edit-button-icon"
        onClick={() => setEditMode(true)}
      />
    </>
  );
}
