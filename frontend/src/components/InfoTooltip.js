import React from "react";
import imgSuccess from "../images/svg/Successful_action.svg"
import imgUnsuccess from "../images/svg/Unsuccessful_action.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_infotool ${props.isOpen && "popup_opened"}`}
      onClick={props.onOverlayClick}>
      <div className="popup__image-container popup__image-container_theme_dark">
        <figure className="popup__figure popup__figure_theme_dark">
          <img
            className="popup__image popup__image_theme_dark"
            src={props.isRegister ? imgSuccess : imgUnsuccess}
            alt={props.isRegister ? "Иконка успешной регистрации" : "Иконка не успешной регистрации"} />
          <figcaption
            className="popup__caption popup__caption_theme_dark">
            {props.isRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </figcaption>
        </figure>
        <button className="popup__close-btn btn-decoration" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;