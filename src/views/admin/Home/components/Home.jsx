import React from "react";

// Components
import OrderHistogram from "./OrderHistogram";
import AverageUtilization from "./AverageUtilization";

// Styles
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.chartsWrapper}>
        <div className={`${styles.chartWrapper} ${styles.piChart}`}>
          <AverageUtilization />
          <h4>Average Utilization</h4>
        </div>
        <div className={`${styles.chartWrapper} ${styles.histogram}`}>
          <h4>Order Queue</h4>
          <OrderHistogram />
        </div>
      </div>
    </div>
  );
};

export default Home;
