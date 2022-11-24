import React, { useContext, useState } from 'react';
import styles from './LandingNav.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const LandingNav: React.FunctionComponent = (): JSX.Element => {
  const { isAuth } = useContext(AppContext);
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.nav_title}>
        TRENO
      </Link>
      <Link
        to={
          isAuth != null
            ? isAuth
              ? '/aplicacion'
              : '/iniciar-sesion'
            : '/iniciar-sesion'
        }
        className={styles.nav_btn}
      >
        {isAuth && "Aplicación"}
        {!isAuth && "Iniciar sesión"}
      </Link>

      <button onClick={() => {
        setHamburgerOpen((prev) => !prev);
      }} className={styles.hamburger}>
        <div className={`${styles.hamburger_stick} ${hamburgerOpen && styles.hamburger_stick_open_1}`}></div>
        <div className={`${styles.hamburger_stick} ${hamburgerOpen && styles.hamburger_stick_open_2}`}></div>
        <div className={`${styles.hamburger_stick} ${hamburgerOpen && styles.hamburger_stick_open_3}`}></div>
      </button>
      <div className={`${styles.menu} ${hamburgerOpen && styles.menu_open}`}>
        <Link
          to={
            isAuth != null
              ? isAuth
                ? '/aplicacion'
                : '/iniciar-sesion'
              : '/iniciar-sesion'
          }
        >
          {isAuth && "Aplicación"}
          {!isAuth && "Iniciar sesión"}
        </Link>
      </div>

    </nav>
  );
};

export default LandingNav;
