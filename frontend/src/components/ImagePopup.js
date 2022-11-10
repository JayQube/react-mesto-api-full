function ImagePopup(props) {

  return (

    <div className={`popup popup_type_fullscreen ${props.card.link && "popup_opened"}`}
      onClick={props.onOverlayClick}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-btn btn-decoration" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
