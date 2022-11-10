import React from "react";
import logo from "../images/svg/logo.svg";
import sandwich from "../images/svg/Sandwich_Button.svg";
import closeIcon from "../images/svg/Close_Icon.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <>
      {props.headerHidden
        &&
        <header className="header header_hidden">
          <nav className="header__navigation header__navigation_hidden">
            <p className="header__user-email header__user-email_hidden">{props.userEmail}</p>
            <button className="header__button header__button_hidden header__button_logout btn-decoration"
              onClick={props.logout}>
              Выйти
            </button>
          </nav>
        </header>
      }

      <header className="header">
        <img src={logo} alt="Лого" className="logo" />
        {props.loggedIn ? <nav className="header__navigation">
          <button
            className="header__button header__button_disabled header__button_logout btn-decoration"
            onClick={props.logout}>
            Выйти
          </button>
          <button className={`${props.loggedIn ? "header__icon btn-decoration" : "header__icon header__icon_hidden"}`}
            onClick={props.onIconClick}>
            <img
              src={!props.headerHidden ? sandwich : closeIcon}
              className={!sandwich ? "header__icon-image" : "header__icon-image header__icon-image_type_sandwich"}
              alt={!props.headerHidden ? "Кнопка меню" : "Кнопка закрыть меню"}
            >
            </img>
          </button>
          <p className="header__user-email">{props.userEmail}</p>
        </nav> :
          <nav className="header__navigation">
            <button className="header__button btn-decoration">
              <Link
                className="link"
                to={props.location !== "/sign-in" ? "/sign-in" : "/sign-up"}>
                {props.location !== "/sign-in" ? "Войти" : "Регистрация"}
              </Link>
            </button>
            <p className="header__user-email">{props.userEmail}</p>
          </nav>
        }
      </header>
    </>
  );
}

export default Header;
