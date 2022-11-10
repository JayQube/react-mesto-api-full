import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `card__trash-btn ${isOwn ? "" : "card__trash-btn_hidden"} btn-decoration`
  );
  const cardLikeButtonClassName = (
    `card__like-btn ${isLiked ? "card__like-btn_active" : ""} btn-decoration`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
