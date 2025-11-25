import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoanAmount, setInterestRate, setLoanTerm, calculateLoan } from "../../store/slices/loanSlice";
import styles from "./LoanCalculator.module.css";

const LoanCalculator = () => {
  const { loanAmount, interestRate, loanTerm, monthlyPayment, totalPayment, totalInterest } = useSelector(
    (state) => state.loan
  );
  const dispatch = useDispatch();

  const handleCalculate = () => {
    dispatch(calculateLoan());
  };

  // Auto-calculate when values change
  useEffect(() => {
    if (loanAmount > 0 && interestRate >= 0 && loanTerm > 0) {
      dispatch(calculateLoan());
    }
  }, [loanAmount, interestRate, loanTerm, dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.inputsSection}>
        <h2>Loan Details</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="loanAmount">Loan Amount (₪)</label>
          <input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
            placeholder="e.g., 1000000"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="interestRate">Annual Interest Rate (%)</label>
          <input
            id="interestRate"
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => dispatch(setInterestRate(Number(e.target.value)))}
            placeholder="e.g., 3.5"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="loanTerm">Loan Term (Years)</label>
          <select id="loanTerm" value={loanTerm} onChange={(e) => dispatch(setLoanTerm(Number(e.target.value)))}>
            <option value={10}>10 years</option>
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
            <option value={25}>25 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>

        <button className={styles.calculateButton} onClick={handleCalculate} disabled={loanAmount <= 0}>
          Recalculate
        </button>
      </div>

      <div className={styles.resultsSection}>
        <h2>Payment Results</h2>

        {monthlyPayment > 0 ? (
          <div className={styles.results}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Monthly Payment:</span>
              <span className={styles.resultValue}>{formatCurrency(monthlyPayment)}</span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Total Payments:</span>
              <span className={styles.resultValue}>{formatCurrency(totalPayment)}</span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Total Interest:</span>
              <span className={styles.resultValue}>{formatCurrency(totalInterest)}</span>
            </div>
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>Enter loan details and click "Calculate Payments"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;

