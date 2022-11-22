import React, { useContext } from 'react';
import DashboardLayout from './Dashboard/DashboardLayout';
import LandingLayout from './Landing/LandingLayout';
import { AppContext } from '../../App';
import styles from './Layout.module.scss';
import Spinner from "../Loader/Loader";

interface Props {
  isDashboard: boolean;
}

const Layout: React.FunctionComponent<Props> = ({
  isDashboard,
}): JSX.Element => {
  const { isLoadingGetUser } = useContext(AppContext);

  return (
    <>
      {isLoadingGetUser === true && (
        <div className={styles.spin}>
          <Spinner />
        </div>
      )}

      {isLoadingGetUser === false && isDashboard && <DashboardLayout />}
      {isLoadingGetUser === false && !isDashboard && <LandingLayout />}
    </>
  );
};

export default Layout;
