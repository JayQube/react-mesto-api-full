import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      savingButtonText="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onOverlayClick={props.onOverlayClick}
      renderLoading={props.renderLoading}
    >
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Имя"
        className="form__item"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="form__error name-error"></span>
      <input
        type="text"
        id="about"
        name="about"
        placeholder="Описание"
        className="form__item"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="form__error about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
