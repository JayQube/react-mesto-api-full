import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth"

function App() {
  const history = useHistory();
  const location = useLocation();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isFullscreenPopupOpen, setIsFullscreenPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isRegistrationAccepted, setIsRegistrationAccepted] = React.useState(false);
  const [isHeaderHiddenOpen, setIsHeaderHiddenOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [renderLoading, setRenderLoading] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [removableCard, setRemovableCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleRegistrationResult() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }

  function handleHeaderIconClick() {
    setIsHeaderHiddenOpen(!isHeaderHiddenOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsFullscreenPopupOpen(!isFullscreenPopupOpen);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovableCard(card);
  }

  function handleUpdateUser(inputValues) {
    setRenderLoading(true);
    api
      .setUserInfo(inputValues)
      .then((info) => {
        setCurrentUser(info);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleUpdateAvatar(inputValues) {
    setRenderLoading(true);
    api
      .setUserAvatar(inputValues)
      .then((info) => {
        setCurrentUser(info);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleAddPlaceSubmit(inputValues) {
    setRenderLoading(true);
    api
      .addCard(inputValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function onOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsFullscreenPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isFullscreenPopupOpen

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  React.useEffect(() => {
    api
      .getInitialInformation()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleRegistration(data) {
    auth.register(data)
      .then(() => {
        history.push('/sign-in');
      })
      .then(() => {
        setIsRegistrationAccepted(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationAccepted(false);
      })
      .finally(() => {
        handleRegistrationResult();
      })
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsHeaderHiddenOpen(false);
    history.push('sign-in');
    setUserEmail('');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          history.push('/');
        })
        .catch(err => console.log(err))
    }
  }

  function handleAuthorization(data) {
    auth.authorization(data)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    tokenCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        userEmail={userEmail}
        loggedIn={loggedIn}
        location={location.pathname}
        logout={handleLogOut}
        onIconClick={handleHeaderIconClick}
        headerHidden={isHeaderHiddenOpen}
      />
      <Switch>
        <Route path="/sign-in">
          <Login
            onAuthorization={handleAuthorization}
          />
        </Route>
        <Route path="/sign-up">
          <Register
            onRegistration={handleRegistration}
          />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />
      </Switch>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onOverlayClick={onOverlayClick}
        renderLoading={renderLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onOverlayClick={onOverlayClick}
        renderLoading={renderLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onOverlayClick={onOverlayClick}
        renderLoading={renderLoading}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        card={removableCard}
        onConfirm={handleCardDelete}
        onOverlayClick={onOverlayClick}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isFullscreenPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={onOverlayClick}
      />
      <InfoTooltip
        isRegister={isRegistrationAccepted}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={onOverlayClick}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
