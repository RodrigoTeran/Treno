import React, { useContext } from 'react';
import styles from './DashboardNav.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';
import { DashboardLayoutContext } from "../../Layout/Dashboard/DashboardLayout";
import DropDown from "../../Form/Dropdown/Dropdown";
import { fetcher, RESPONSE } from "../../../utils/fetcher";
import { logout as logoutRoute } from "../../../routes/auth.routes";
import { RESPONSE_DATA } from "../../../routes/index.routes";
import { useAuth } from "../../../hooks/useAuth";

const Home = () => {
  return (
    <svg viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8277 10.7237C20.4476 10.7237 20.9945 10.2017 20.9945 9.52681C21.031 9.19123 20.8851 8.89293 20.5934 8.63193L18.6683 6.89808V2.38636C18.6683 1.72638 18.1469 1.19318 17.5015 1.19318H16.3347C15.6894 1.19318 15.168 1.72638 15.168 2.38636V3.75479L11.2848 0.261009C11.066 0.0745739 10.7744 0 10.5191 0C10.2639 0 9.9722 0.0372869 9.71697 0.298295L0.364614 8.63193C0.109384 8.89293 0 9.19123 0 9.52681C0 10.198 0.51046 10.7237 1.16677 10.7237H2.33353V13.3226C2.32989 13.3562 2.32989 13.3897 2.32989 13.427V17.5994C2.32989 18.4235 2.98255 19.0909 3.78834 19.0909H4.37173C4.41548 19.0909 4.45923 19.0872 4.50299 19.0835C4.55768 19.0872 4.61237 19.0909 4.66706 19.0909H5.83383H6.7089C7.5147 19.0909 8.16736 18.4235 8.16736 17.5994V16.7045V14.3182C8.16736 13.6582 8.68876 13.125 9.33413 13.125H11.6677C12.313 13.125 12.8344 13.6582 12.8344 14.3182V16.7045V17.5994C12.8344 18.4235 13.4871 19.0909 14.2929 19.0909H15.168H16.353C16.404 19.0909 16.455 19.0909 16.5061 19.0872C16.5462 19.0909 16.5863 19.0909 16.6264 19.0909H17.2098C18.0156 19.0909 18.6683 18.4235 18.6683 17.5994V16.9954C18.6792 16.8984 18.6865 16.7978 18.6865 16.6934L18.661 10.72H19.8277V10.7237Z" />
    </svg>
  )
}

const DashboardNav: React.FunctionComponent = (): JSX.Element => {
  const { user, setMessages, setUser, setIsAuth } = useContext(AppContext);
  const { hamburgerOpen, setHamburgerOpen } = useContext(DashboardLayoutContext);

  const dropOptions = ["Salir sesión"];

  const fetchUser = useAuth({
    setUser, setIsAuth
  })

  const handler = (value: string) => {
    if (value === "Salir sesión") {
      logout();
    }
  }
  const logout = (): void => {
    const doFetch = async (): Promise<void> => {
      const res: RESPONSE = await fetcher[logoutRoute.method]({ uri: logoutRoute.url });
      const resData: RESPONSE_DATA = res.data;
      if (resData.readMsg && setMessages) {
        setMessages((prev) => [
          ...prev,
          {
            type: resData.typeMsg,
            msg: resData.message,
            index: new Date().getTime() + prev.length
          }
        ])

        return;
      }

      // Refetch
      fetchUser();
    }
    void doFetch();
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_section}>
        <Link to="/" className={styles.nav_section_title}>
          Treno
        </Link>
      </div>
      <div className={styles.nav_controllers}>
        <div className={styles.nav_controllers_icon}>
          <Home />
        </div>
        <div className={styles.nav_controllers_profile}>
          <div className={styles.nav_controllers_profile_img}>
          </div>
          <div className={styles.nav_controllers_profile_name}>
            {user?.username}
          </div>
          <div className={styles.nav_controllers_profile_drop}>
            <DropDown
              placeholder=""
              arrayValues={dropOptions}
              classNameInfo={styles.drop}
              className={styles.dropdown}
              onClickHandler={handler}
            />
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
