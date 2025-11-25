import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanAmount: 0,
  interestRate: 3.5,
  loanTerm: 30,
  monthlyPayment: 0,
  totalPayment: 0,
  totalInterest: 0,
  calculations: [],
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoanAmount: (state, action) => {
      state.loanAmount = action.payload;
    },
    setInterestRate: (state, action) => {
      state.interestRate = action.payload;
    },
    setLoanTerm: (state, action) => {
      state.loanTerm = action.payload;
    },
    calculateLoan: (state) => {
      const { loanAmount, interestRate, loanTerm } = state;

      if (loanAmount <= 0) {
        state.monthlyPayment = 0;
        state.totalPayment = 0;
        state.totalInterest = 0;
        return;
      }

      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      if (monthlyRate === 0) {
        state.monthlyPayment = loanAmount / numberOfPayments;
      } else {
        state.monthlyPayment =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }

      state.totalPayment = state.monthlyPayment * numberOfPayments;
      state.totalInterest = state.totalPayment - loanAmount;

      // Save calculation to history
      const calculation = {
        id: Date.now(),
        loanAmount,
        interestRate,
        loanTerm,
        monthlyPayment: state.monthlyPayment,
        totalPayment: state.totalPayment,
        totalInterest: state.totalInterest,
        timestamp: new Date().toISOString(),
      };

      state.calculations.unshift(calculation);

      // Keep only last 10 calculations
      if (state.calculations.length > 10) {
        state.calculations = state.calculations.slice(0, 10);
      }
    },
    clearCalculations: (state) => {
      state.calculations = [];
    },
  },
});

export const { setLoanAmount, setInterestRate, setLoanTerm, calculateLoan, clearCalculations } = loanSlice.actions;

export default loanSlice.reducer;


