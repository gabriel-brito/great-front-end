import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("html");
  const buttonStyles = (isActive) =>
    isActive
      ? { backgroundColor: "blue", fontWeight: 700, color: "white" }
      : {};

  const handleTab = (newTab) => {
    if (newTab === activeTab) return;

    setActiveTab(newTab);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => handleTab("html")}
          style={buttonStyles(activeTab === "html")}
        >
          HTML
        </button>
        <button
          onClick={() => handleTab("css")}
          style={buttonStyles(activeTab === "css")}
        >
          CSS
        </button>
        <button
          onClick={() => handleTab("javascript")}
          style={buttonStyles(activeTab === "javascript")}
        >
          JavaScript
        </button>
      </div>

      <div>
        {activeTab === "html" && (
          <p>
            The HyperText Markup Language or HTML is the standard markup
            language for documents designed to be displayed in a web browser.
          </p>
        )}

        {activeTab === "css" && (
          <p>
            Cascading Style Sheets is a style sheet language used for describing
            the presentation of a document written in a markup language such as
            HTML or XML.
          </p>
        )}

        {activeTab === "javascript" && (
          <p>
            JavaScript, often abbreviated as JS, is a programming language that
            is one of the core technologies of the World Wide Web, alongside
            HTML and CSS.
          </p>
        )}
      </div>
    </div>
  );
}
