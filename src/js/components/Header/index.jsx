import React, { Component } from "react";
import Logo from "../Logo";
import Search from "../Search";
import Action from "../Action";
import styles from "./index.module.scss";

class Header extends Component {
  render() {
    return (
      <nav className={styles.navbar}>
        {/* Когда "починю "бургер" - надо вынести в отдельный компонент */}
        <label
          className={styles["header__checkbox-label"]}
          htmlFor="menu-checkbox"
        >
          <span className={styles["navbar-toggle"]} id="js-navbar-toggle">
            <svg
              width={24}
              height={24}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              class="svg-inline--fa fa-bars fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </span>
        </label>
        <Logo />
        <input
          className={styles.header__checkbox}
          id="menu-checkbox"
          type="checkbox"
          style={{ display: " none" }}
        />
        <div className={styles["js-menu"]}>
          <Search />
          <span className={styles["main-nav"]}>
            <Action
              title="Активные"
              status="active"
              onClick={this.showActive}
            />
            <Action title="Архив" onClick={this.showArchive} />
            <Action title="Добавить" status="btn" onClick={this.showModal} />
          </span>
        </div>
      </nav>
    );
  }
}

export default Header;
