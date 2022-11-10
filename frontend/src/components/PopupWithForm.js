function PopupWithForm({ name,
  title,
  buttonText,
  savingButtonText,
  isOpen,
  onClose,
  onSubmit,
  onOverlayClick,
  renderLoading,
  children }) {

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onOverlayClick}
    >
      <div className={`popup__container popup__container_type_${name}`}>
      <form
        className="form"
        name={name}
        onSubmit={onSubmit}
      >
        <p className={`form__title ${name === "confirm" && "form__title_confirm"}`}>{title}</p>
        <fieldset className="form__input-container">
          {children}
          <button
            type="submit"
            className="form__confirm-btn"
          >
            {renderLoading ? savingButtonText : buttonText}
          </button>
        </fieldset>
      </form>
      <button
        className="popup__close-btn btn-decoration"
        type="button"
        onClick={onClose}
      />
      </div>
      
    </div>
  );
}

export default PopupWithForm;
