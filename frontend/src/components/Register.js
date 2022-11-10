import React from "react";
import { Link } from "react-router-dom";

function Register(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegistration({ email, password });
  }

  return (
    <form
      className='form form_theme_dark'
      name='register'
      onSubmit={handleSubmit}
    >
      <p className="form__title form__title_theme_dark">Регистрация</p>
      <fieldset className="form__input-container">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="form__item form__item_theme_dark"
          required
          onChange={handleEmailChange}
          value={email || ""}
        />
        <span className="form__error title-error"></span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          className="form__item form__item_theme_dark"
          required
          onChange={handlePasswordChange}
          value={password || ""}
        />
        <span className="form__error title-error"></span>
        <button
          type="submit"
          className="form__confirm-btn form__confirm-btn_theme_dark"
        >
          Зарегистрироваться
        </button>
        <p className="form__question">
          Уже зарегистрированы?
          <Link className="link btn-decoration" to="/sign-in"> Войти</Link>
        </p>
      </fieldset>
    </form>
  )
}

export default Register;