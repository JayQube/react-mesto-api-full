import React from "react";

function Login(props) {

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
    props.onAuthorization({ email, password });
  }

  return (
    <form
      className='form form_theme_dark'
      name='login'
      onSubmit={handleSubmit}
    >
      <p className="form__title form__title_theme_dark">Вход</p>
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
          Войти
        </button>
      </fieldset>
    </form>
  )
}

export default Login;