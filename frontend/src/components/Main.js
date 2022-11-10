import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
          <div className="profile__overlay" onClick={props.onEditAvatar}></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__username">{currentUser.name}</h1>
          <button
            className="profile__edit-btn btn-decoration"
            type="button"
            onClick={props.onEditProfile}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn btn-decoration"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
