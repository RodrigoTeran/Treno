import React, { useContext } from 'react';
import styles from './LandingNav.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';

const LandingNav: React.FunctionComponent = (): JSX.Element => {
  const { isAuth } = useContext(AppContext);

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
        {isAuth && "Ir a la aplicación"}
        {!isAuth && "Iniciar sesión"}
      </Link>
    </nav>
  );
};

export default LandingNav;
