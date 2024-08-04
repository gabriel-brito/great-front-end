import submitForm from "./submitForm";
import "./styles.css";

// payload
// name
// email
// message

export default function App() {
  return (
    <form
      onSubmit={submitForm}
      action="https://www.greatfrontend.com/api/questions/contact-form"
      method="POST"
    >
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        Name
        <input type="text" placeholder="Your name" name="name" />
      </label>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        E-mail
        <input type="email" placeholder="Your e-mail" name="email" />
      </label>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        Comments
        <textarea name="message" placeholder="Type your message" />
      </label>

      <button type="submit">Send</button>
    </form>
  );
}
