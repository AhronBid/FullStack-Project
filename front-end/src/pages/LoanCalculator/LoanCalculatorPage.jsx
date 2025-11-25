import React from "react";
import LoanCalculator from "../../components/LoanCalculator/LoanCalculator";
import styles from "./LoanCalculatorPage.module.css";

const LoanCalculatorPage = () => {
  return (
    <div className={styles.calculatorPage}>
      <h1>Loan Calculator</h1>
      <LoanCalculator />
    </div>
  );
};

export default LoanCalculatorPage;
