import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onOverlayClick={props.onOverlayClick}
    />
  )
}

export default ConfirmPopup;