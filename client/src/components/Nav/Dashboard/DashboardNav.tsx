import React, { useContext } from 'react';
import styles from './DashboardNav.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';
import { DashboardLayoutContext } from "../../Layout/Dashboard/DashboardLayout";

const Bell = () => {
  return (
    <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99921 0C7.36708 0 6.85637 0.530664 6.85637 1.1875V1.9C4.24926 2.44922 2.285 4.84648 2.285 7.71875V8.41641C2.285 10.1605 1.66715 11.8453 0.552881 13.1516L0.288598 13.4596C-0.0113978 13.8084 -0.0828254 14.3094 0.099315 14.7361C0.281456 15.1629 0.692164 15.4375 1.14216 15.4375H14.8563C15.3063 15.4375 15.7134 15.1629 15.8991 14.7361C16.0848 14.3094 16.0098 13.8084 15.7098 13.4596L15.4455 13.1516C14.3313 11.8453 13.7134 10.1643 13.7134 8.41641V7.71875C13.7134 4.84648 11.7492 2.44922 9.14205 1.9V1.1875C9.14205 0.530664 8.63135 0 7.99921 0ZM9.61705 18.3061C10.0456 17.8607 10.2849 17.2559 10.2849 16.625H7.99921H5.71353C5.71353 17.2559 5.95281 17.8607 6.38138 18.3061C6.80994 18.7514 7.39208 19 7.99921 19C8.60635 19 9.18848 18.7514 9.61705 18.3061Z" />
    </svg>
  )
}

const Home = () => {
  return (
    <svg viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8277 10.7237C20.4476 10.7237 20.9945 10.2017 20.9945 9.52681C21.031 9.19123 20.8851 8.89293 20.5934 8.63193L18.6683 6.89808V2.38636C18.6683 1.72638 18.1469 1.19318 17.5015 1.19318H16.3347C15.6894 1.19318 15.168 1.72638 15.168 2.38636V3.75479L11.2848 0.261009C11.066 0.0745739 10.7744 0 10.5191 0C10.2639 0 9.9722 0.0372869 9.71697 0.298295L0.364614 8.63193C0.109384 8.89293 0 9.19123 0 9.52681C0 10.198 0.51046 10.7237 1.16677 10.7237H2.33353V13.3226C2.32989 13.3562 2.32989 13.3897 2.32989 13.427V17.5994C2.32989 18.4235 2.98255 19.0909 3.78834 19.0909H4.37173C4.41548 19.0909 4.45923 19.0872 4.50299 19.0835C4.55768 19.0872 4.61237 19.0909 4.66706 19.0909H5.83383H6.7089C7.5147 19.0909 8.16736 18.4235 8.16736 17.5994V16.7045V14.3182C8.16736 13.6582 8.68876 13.125 9.33413 13.125H11.6677C12.313 13.125 12.8344 13.6582 12.8344 14.3182V16.7045V17.5994C12.8344 18.4235 13.4871 19.0909 14.2929 19.0909H15.168H16.353C16.404 19.0909 16.455 19.0909 16.5061 19.0872C16.5462 19.0909 16.5863 19.0909 16.6264 19.0909H17.2098C18.0156 19.0909 18.6683 18.4235 18.6683 17.5994V16.9954C18.6792 16.8984 18.6865 16.7978 18.6865 16.6934L18.661 10.72H19.8277V10.7237Z" />
    </svg>
  )
}

const ChevronDown = () => {
  return (
    <svg viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.39485 6.7437C5.72955 7.08543 6.27312 7.08543 6.60783 6.7437L11.749 1.49473C12.0837 1.153 12.0837 0.598028 11.749 0.256298C11.4143 -0.0854325 10.8707 -0.0854325 10.536 0.256298L6 4.88742L1.46402 0.259031C1.12931 -0.0826989 0.585741 -0.0826989 0.251032 0.259031C-0.0836773 0.600761 -0.0836773 1.15573 0.251032 1.49746L5.39217 6.74644L5.39485 6.7437Z" />
    </svg>
  )
}

const DashboardNav: React.FunctionComponent = (): JSX.Element => {
  const { user } = useContext(AppContext);
  const { hamburgerOpen, setHamburgerOpen } = useContext(DashboardLayoutContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_section}>
        <Link to="/" className={styles.nav_section_title}>
          Treno
        </Link>
      </div>
      <div className={styles.nav_controllers}>
        <div className={styles.nav_controllers_icon}>
          <Bell />
        </div>
        <div className={styles.nav_controllers_icon}>
          <Home />
        </div>
        <div className={styles.nav_controllers_profile}>
          <div className={styles.nav_controllers_profile_img}>

          </div>
          <div className={styles.nav_controllers_profile_name}>
            {user?.name}
          </div>
          <div className={styles.nav_controllers_profile_drop}>
            <ChevronDown />
          </div>
        </div>
      </div>
      <button onClick={() => {
        if (!setHamburgerOpen) return;
        setHamburgerOpen((prev) => !prev);
      }} className={styles.hamburger}>
        <div className={`${styles.hamburger_stick} ${hamburgerOpen && styles.hamburger_stick_open_1}`}></div>
        <div className={`${styles.hamburger_stick} ${hamburgerOpen && styles.hamburger_stick_open_2}`}></div>
        <div className={`${styles.hamburger_stick} ${hamburgerOpen && styles.hamburger_stick_open_3}`}></div>
      </button>
    </nav>
  );
};

export default DashboardNav;
