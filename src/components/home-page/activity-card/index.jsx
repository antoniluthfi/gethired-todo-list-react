import React, { useContext } from "react";
import { ActivityItemDeleteButtonIcon } from "../../../assets";
import { AppContext } from "../../../AppContext";
import { format } from "date-fns";
import localeId from "date-fns/locale/id";
import { useNavigate } from "react-router-dom";

export default function ActivityCard({ id, title, createdAt, onBeforeDelete }) {
  const { setShowDeleteModal } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="activity-card" data-cy="activity-item">
      <h1
        data-cy="activity-item-title"
        onClick={() => {
          navigate(`/detail/${id}`);
        }}
      >
        {title}
      </h1>

      <div className="activity-card__footer">
        <p data-cy="activity-item-date">
          {createdAt
            ? format(new Date(createdAt), "d MMMM yyyy", {
                locale: localeId,
              })
            : ""}
        </p>
        <button
          data-cy="activity-item-delete-button"
          onClick={() => {
            setShowDeleteModal(true);
            onBeforeDelete();
          }}
        >
          <img src={ActivityItemDeleteButtonIcon} alt="delete-icon" />
        </button>
      </div>
    </div>
  );
}
