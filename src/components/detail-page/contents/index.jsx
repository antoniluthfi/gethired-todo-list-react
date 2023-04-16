import React, { useContext, useMemo, useState } from "react";
import { TodoEmptyState } from "../../../assets";
import Button from "../../global/button";
import useFetchInitialValues from "./hooks/useFetchInitialValues";
import { AppContext } from "../../../AppContext";
import Loading from "../../global/loading";
import { Link } from "react-router-dom";
import { BackButtonIcon } from "../../../assets";
import EditableTitle from "../editable-title";
import { updateActivityById } from "../../../api/activities";
import AddTodoModal from "../add-todo-modal";
import TodoCard from "../todo-card";
import DeleteModal from "../../global/delete-modal";
import Sorter from "../sorter";

export default function Contents() {
  const {
    showAddTodoModal,
    setShowAddTodoModal,
    showDeleteModal,
    setShowDeleteModal,
  } = useContext(AppContext);
  const {
    data,
    activityName,
    isLoading,
    createTodo,
    updateTodo,
    selectedId,
    todoDetails,
    setSelectedId,
    fetchDetailsData,
    deleteTodo,
  } = useFetchInitialValues();
  const [sortValue, setSortValue] = useState("Terbaru");
  const [todoTitle, setTodoTitle] = useState("");

  const sortedData = useMemo(() => {
    if (sortValue === "Terbaru") {
      return data.sort((a, b) => b.id - a.id);
    }

    if (sortValue === "Terlama") {
      return data.sort((a, b) => a.id - b.id);
    }

    if (sortValue === "A-Z") {
      return data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }

    if (sortValue === "Z-A") {
      return data.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
    }

    if (sortValue === "Belum Selesai") {
      return data.sort((a, b) => b.is_active - a.is_active);
    }
  }, [sortValue, isLoading]);

  return (
    <main className="detail-contents">
      <div className="detail-contents__header">
        <div className="section1" data-cy="todo-title">
          <Link to="/">
            <img
              src={BackButtonIcon}
              alt="back-button"
              className="back-button-icon"
            />
          </Link>
          <EditableTitle
            value={activityName}
            onSave={async (val) => await updateActivityById(val)}
          />
        </div>
        <div className="section2">
          {data.length ? <Sorter onChange={setSortValue} /> : null}
          <Button
            dataCy="todo-add-button"
            onClick={() => setShowAddTodoModal(true)}
          >
            <span className="plus-icon">+</span> Tambah
          </Button>
        </div>
      </div>

      <div className="detail-contents__main">
        {isLoading ? (
          <Loading />
        ) : !data.length ? (
          <div className="empty-list">
            <img
              src={TodoEmptyState}
              alt="empty-state"
              onClick={() => setShowAddTodoModal(true)}
            />
          </div>
        ) : (
          <div className="todo-list">
            {sortedData.map((d) => (
              <TodoCard
                key={`${d?.id}_${d?.title}`}
                {...d}
                onOpenEditModal={() => {
                  setSelectedId(d?.id);
                  fetchDetailsData(d?.id);
                }}
                onOpenDeleteModal={() => {
                  setSelectedId(d?.id);
                  setShowDeleteModal(true);
                  setTodoTitle(d?.title);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AddTodoModal
        isOpen={showAddTodoModal}
        isEditMode={!!selectedId}
        defaultValue={todoDetails}
        onClose={() => {
          setShowAddTodoModal(false);
          setSelectedId("");
          setTodoTitle("");
        }}
        onSubmit={(values) => {
          if (selectedId) {
            updateTodo({ id: selectedId, ...values });
          } else {
            createTodo(values);
          }
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onDelete={deleteTodo}
        highlightText={`"${todoTitle}"?`}
      />
    </main>
  );
}
