import React, { useContext } from 'react';
import DashboardLayout from './Dashboard/DashboardLayout';
import LandingLayout from './Landing/LandingLayout';
import { AppContext } from '../../App';
import styles from './Layout.module.scss';
import Spinner from "../Loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { fadeExitVariants, fadeVariants } from "../../animations/fade";

interface Props {
  isDashboard: boolean;
}

const Layout: React.FunctionComponent<Props> = ({
  isDashboard,
}): JSX.Element => {
  const { isLoadingGetUser } = useContext(AppContext);

  return (
    <AnimatePresence mode='wait'>
      {isLoadingGetUser === true ? (
        <motion.div
          exit="exit"
          initial="hidden"
          animate="visible"
          variants={fadeExitVariants(1.5)}
          key={"loader"}
          className={styles.spin}>
          <Spinner />
        </motion.div>
      ) : (
        <motion.div
          exit="exit"
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          className={styles.layout}>
          {isLoadingGetUser === false && isDashboard && <DashboardLayout />}
          {isLoadingGetUser === false && !isDashboard && <LandingLayout />}
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default Layout;
