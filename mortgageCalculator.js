import { useState } from "react";
import "./styles.css";

// Mortgage Math
// M = P (i (1+i) n) / ((1+i) n - 1)
// M: Monthly mortgage payment
// P: Loan amount
// i: Monthly interest rate (APR / 12)
// n: Total number of payments (loan term in years x 12)

const formatCurrency = (num) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

const mortgageCalculation = (
  loanAmount = 0,
  annualInterestRate = 0,
  loanTerm = 0
) => {
  const loanTermInMonths = loanTerm * 12;
  const monthlyAPR = annualInterestRate / 100 / 12;
  const monthlyMortgagePayment =
    (loanAmount * (monthlyAPR * (monthlyAPR + 1) ** loanTermInMonths)) /
    ((1 + monthlyAPR) ** loanTermInMonths - 1);

  const totalMortgageWithoutInterest = loanAmount;
  const totalPaymentAmount = monthlyMortgagePayment * loanTermInMonths;
  const totalInterestPaid = totalPaymentAmount - totalMortgageWithoutInterest;

  return {
    monthlyMortgagePayment: formatCurrency(
      Math.round(monthlyMortgagePayment, 2)
    ),
    totalPaymentAmount: formatCurrency(Math.round(totalPaymentAmount, 2)),
    totalInterestPaid: formatCurrency(Math.round(totalInterestPaid, 2)),
  };
};

// First input: Loan Amount ($)
// Second input: Annual interest rate (%) - Or APR
// Third input: Loan term (in years)

// Outputs
// Using the inputs, the calculator should compute
// the following and display the results to the user:
// 1) Monthly mortgage payment
// 2) Total payment amount
// 3) Total interest paid

// Important details
// 1) If a non-numerical string is entered into any input field,
// the calculator should display an error message.
// Additionally, the calculator should handle any other
// invalid inputs that may arise.

// 2) Round the result amounts to 2 decimal places.
// Math.round(result, 2)

const rowStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  marginBottom: "16px",
};

export default function App() {
  const [result, setResult] = useState({});
  const hasResult = Object.keys(result).length > 0;

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const loanAmount = formData.get("loanAmount");
    const anualInterestRate = formData.get("anualInterestRate");
    const loanTerm = formData.get("loanTerm");

    setResult(mortgageCalculation(loanAmount, anualInterestRate, loanTerm));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={rowStyles}>
          <label htmlFor="loan-amount">Loan Amount</label>
          <input
            placeholder="0"
            type="number"
            id="loan-amount"
            name="loanAmount"
          />
        </div>

        <div style={rowStyles}>
          <label htmlFor="anual-interest-rate">Anual Interest Rate</label>
          <input
            placeholder="0"
            type="number"
            id="anual-interest-rate"
            name="anualInterestRate"
            step="0.001"
            min="0"
          />
        </div>

        <div style={rowStyles}>
          <label htmlFor="loan-term">Loan Term (in Years)</label>
          <input placeholder="0" type="number" id="loan-term" name="loanTerm" />
        </div>

        <button type="submite">Calculate</button>
      </form>

      {hasResult && (
        <div>
          <p>Monthly payment: {result.monthlyMortgagePayment}</p>
          <p>Total payment amount: {result.totalPaymentAmount}</p>
          <p>Total interest paid: {result.totalInterestPaid}</p>
        </div>
      )}
    </>
  );
}
