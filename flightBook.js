import { useState } from "react";
import "./styles.css";

const minSelectDate = new Date().toISOString().split("T")[0];

const invalidDate = (date, type) => {
  if (!date) {
    alert(`You must choose a ${type} date!`);

    return true;
  }

  return false;
};

const returnDateValidation = (departureDate, returnDate) => {
  if (new Date(departureDate) > new Date(returnDate)) {
    alert("departure date cannot be before return date");
  }
};

const toLocaleDateString = (date) => {
  return new Date(date).toLocaleDateString();
};

export default function App() {
  const [flightType, setFlightType] = useState("one-way");
  const isReturnFlight = flightType === "return-flight";

  const handleSelect = (event) => {
    setFlightType(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const departureDate = formData.get("departure");
    const returnDate = formData.get("return");

    if (invalidDate(departureDate, "Departure flight")) {
      return;
    }

    if (isReturnFlight) {
      returnDateValidation(departureDate, returnDate);

      if (invalidDate(returnDate, "Return flight")) {
        return;
      }

      alert(
        `You have booked a return flight, departing on ${toLocaleDateString(
          departureDate
        )} and returning on ${toLocaleDateString(returnDate)}`
      );

      return;
    }

    alert(
      `You have booked a one-way flight on ${toLocaleDateString(departureDate)}`
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <select value={flightType} onChange={handleSelect}>
          <option value="one-way">One-way flight</option>

          <option value="return-flight">Return flight</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="departure-input">Departure: </label>
        <input
          type="date"
          id="departure-input"
          name="departure"
          min={minSelectDate}
        />
      </div>

      {isReturnFlight && (
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="return-input">Return: </label>
          <input
            type="date"
            id="return-input"
            name="return"
            min={minSelectDate}
          />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}
